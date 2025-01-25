import { applicationConfiguration } from '$api/utils/application-configuration';
import * as genericPool from 'generic-pool';
import {
  type RedisClientType,
  type RedisDefaultModules,
  type RedisFunctions,
  type RedisScripts,
  createClient,
} from 'redis';

type RedisClient = RedisClientType<RedisDefaultModules, RedisFunctions, RedisScripts>;

interface RedisConfig {
  url: string;
  retryStrategy: (retries: number) => number;
}

interface PoolConfig {
  min: number;
  max: number;
  acquireTimeoutMillis: number;
  idleTimeoutMillis: number;
  evictionRunIntervalMillis: number;
  fifo: boolean;
}

interface Config {
  redis: RedisConfig;
  pool: PoolConfig;
}

const CONFIG: Config = {
  redis: {
    url: applicationConfiguration.redisUrl,
    retryStrategy: (retries: number) => {
      return Math.min(retries * 50, 3000);
    },
  },
  pool: {
    min: applicationConfiguration.redisPoolMinimum,
    max: applicationConfiguration.redisPoolMaximum,
    acquireTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    evictionRunIntervalMillis: 1000,
    fifo: true,
  },
};

const createRedisClient = async (): Promise<RedisClient> => {
  const client = createClient({
    url: CONFIG.redis.url,
    socket: {
      reconnectStrategy: CONFIG.redis.retryStrategy,
    },
  });

  client.on('error', (err: Error) => {
    // since this might happen before fastify can be created, we need to use javascript's native logger
    console.error('Redis Client Error:', err);
  });

  await client.connect();

  return client;
};

const createPool = (): genericPool.Pool<RedisClient> =>
  genericPool.createPool(
    {
      create: createRedisClient,
      destroy: async (client: RedisClient) => {
        client.quit();
      },
    },
    CONFIG.pool,
  );

const pool = createPool();

const shutdown = async (): Promise<void> => {
  await pool.drain();
  await pool.clear();
};

process.on('SIGTERM', async () => {
  await shutdown();
  process.exit(0);
});

const getConnection = (): Promise<RedisClient> => {
  return pool.acquire();
};

const releaseConnection = (redisConnection: RedisClient): Promise<void> => {
  return pool.release(redisConnection);
};

const manageConnection = async <T>(callback: (redisConnection: RedisClient) => Promise<T>): Promise<T> => {
  const redisConnection = await getConnection();

  try {
    return await callback(redisConnection);
  } finally {
    await releaseConnection(redisConnection);
  }
};

export const redisUtils = {
  getConnection,
  releaseConnection,
  manageConnection,
};
