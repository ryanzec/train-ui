import { stringUtils } from '$/utils/string';
import type { PostgresColumnValue } from '$api/types/postgres';
import { applicationConfiguration } from '$api/utils/application-configuration';
import { loggerUtils } from '$api/utils/logger';
import type { PoolConfig, QueryResult, QueryResultRow } from 'pg';
import pg from 'pg';

// slight old but because how pg export things, directly exporting Pool does not work
const { Pool } = pg;

const config: PoolConfig = {
  host: applicationConfiguration.databaseHost,
  port: applicationConfiguration.databasePort,
  database: applicationConfiguration.databaseName,
  user: applicationConfiguration.databaseUser,
  password: applicationConfiguration.databasePassword,
  max: applicationConfiguration.databasePoolMaximum,
  idleTimeoutMillis: applicationConfiguration.databaseIdleTimeout,
  connectionTimeoutMillis: applicationConfiguration.databaseConnectionTimeout,
  ssl: applicationConfiguration.databaseSsl,
};

const createPool = (config: PoolConfig): pg.Pool => {
  return new Pool(config as PoolConfig);
};

// initialize the database connections pool
let pool: pg.Pool | null = createPool(config);

pool.on('error', (err) => {
  // since this might happen before fastify can be created, we need to use javascript's native logger
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

type BuildSetQueryDataReturn = {
  query: string;
  queryValues: PostgresColumnValue[];
};

const buildSetQuery = async (
  mapping: Record<string, string>,
  data: { [key: string]: PostgresColumnValue },
  tableName: string,
  updateOnValue: PostgresColumnValue,
  updateOnColumn = 'id',
): Promise<BuildSetQueryDataReturn> => {
  if (!pool) {
    loggerUtils.getLogger().error('pool must being configure before building queries');

    return {
      query: '',
      queryValues: [],
    };
  }

  const { updateColumns, queryValues } = Object.entries(mapping).reduce(
    (collector, [dataKey, columnName]) => {
      if (data[dataKey] !== undefined) {
        collector.updateColumns.push(columnName);
        collector.queryValues.push(data[dataKey]);
      }

      return collector;
    },
    {
      updateColumns: [] as string[],
      queryValues: [] as PostgresColumnValue[],
    },
  );

  const client = await pool.connect();
  const safeTableName = client.escapeIdentifier(tableName);
  const safeUpdateOnColumnName = client.escapeIdentifier(updateOnColumn);

  client.release();

  queryValues.push(updateOnValue);

  // if there is only one column to update, postgres will error when using the multi-column update syntax
  // so need to handle this separately
  if (updateColumns.length === 1) {
    return {
      query: `UPDATE ${safeTableName} SET ${updateColumns[0]} = $1 WHERE ${safeUpdateOnColumnName} = $2 RETURNING *`,
      queryValues,
    };
  }

  const columnString = updateColumns.join(', ');
  // offset the index by 1 because postgres starts at 1 not 0
  const parametersString = updateColumns.map((value) => `$${updateColumns.indexOf(value) + 1}`).join(', ');

  return {
    query: `UPDATE ${safeTableName} SET (${columnString}) = (${parametersString}) WHERE ${safeUpdateOnColumnName} = $${queryValues.length} RETURNING *`,
    queryValues,
  };
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
  buildSetQuery,
};
