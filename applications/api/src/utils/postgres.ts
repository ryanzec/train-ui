import { stringUtils } from '$/utils/string';
import type { PoolConfig, QueryResult, QueryResultRow } from 'pg';
import pg from 'pg';

// slight old but because how pg export things, directly exporting Pool does not work
const { Pool } = pg;

const config: PoolConfig = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number.parseInt(process.env.DATABASE_PORT || '5432'),
  database: process.env.DATABASE_NAME || 'postgres',
  user: process.env.DATABASE_USER || '',
  password: process.env.DATABASE_PASSWORD || '',
  max: Number.parseInt(process.env.DATABASE_PORT || '20'),
  idleTimeoutMillis: Number.parseInt(process.env.DATABASE_IDLE_TIMEOUT || '30000'),
  connectionTimeoutMillis: Number.parseInt(process.env.DATABASE_CONNECTION_TIMEOUT || '2000'),
  ssl: process.env.NODE_ENV === 'production',
};

const createPool = (config: PoolConfig): pg.Pool => {
  return new Pool(config as PoolConfig);
};

// initialize the database connections pool
let pool: pg.Pool | null = createPool(config);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const closeDb = async (): Promise<void> => {
  if (!pool) {
    return;
  }

  await pool.end();

  pool = null;
};

process.on('SIGTERM', async () => {
  await closeDb();

  process.exit(0);
});

const executeQuery = async <T extends QueryResultRow>(
  query: string,

  // biome-ignore lint/suspicious/noExplicitAny: this is a generic implementation so we need to allow for any here
  params?: any[],
): Promise<QueryResult<T>> => {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }

  const client = await pool.connect();

  try {
    const results = await client.query<T>(query, params);

    return {
      ...results,
      rows: transformKeys(results.rows) as T[],
    };
  } finally {
    client.release();
  }
};

const executeTransaction = async <T extends QueryResultRow>(
  // biome-ignore lint/suspicious/noExplicitAny: this is a generic implementation so we need to allow for any here
  queries: Array<{ query: string; params?: any[] }>,
): Promise<T[][]> => {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const results: T[][] = [];
    for (const { query, params } of queries) {
      const result = await client.query<T>(query, params);
      results.push(result.rows);
    }

    await client.query('COMMIT');

    return results;
  } catch (error) {
    await client.query('ROLLBACK');

    throw error;
  } finally {
    client.release();
  }
};

// allow postgres to use the default naming convention but convert when pulled from the database for the ts convention
const transformKeys = (data: object | object[]): object | object[] => {
  if (Array.isArray(data)) {
    return data.map(transformKeys);
  }

  if (data === null || typeof data !== 'object') {
    return data;
  }

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [stringUtils.snakeToCamel(key), transformKeys(value)]),
  );
};

export const postgresUtils = {
  executeQuery,
  executeTransaction,
};
