import path from 'node:path';
import * as process from 'node:process';
import url from 'node:url';
import { loggerUtils } from '$api/utils/logger';
import dotenv from 'dotenv';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const requiredEnvironmentVariables = [
  'FRONTEND_URL',
  'API_URL',
  'API_PORT',
  'AUTHENTICATION_PROJECT_ID',
  'AUTHENTICATION_SECRET',
  'API_CORS_ORIGIN',
  'API_CORS_METHODS',
  'API_CORS_ALLOWED_HEADERS',
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_NAME',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_POOL_MAXIMUM',
  'DATABASE_IDLE_TIMEOUT',
  'DATABASE_CONNECTION_TIMEOUT',
  'DATABASE_SSL',
  'REDIS_URL',
  'REDIS_POOL_MINIMUM',
  'SESSION_ENCRYPTION_ALGORITHM',
  'SESSION_ENCRYPTION_KEY',
  'SESSION_ENCRYPTION_IV_LENGTH',
  'SESSION_SECRET',
  'SESSION_MAX_AGE',
  'LOG_LEVEL',
];

for (const variable of requiredEnvironmentVariables) {
  if (process.env[variable]) {
    continue;
  }

  // since this might happen before fastify can be created, we need to use javascript's native logger
  console.error(`missing required environment variable '${variable}' so can not start api server`);

  process.exit(1);
}

export interface ApplicationConfiguration {
  frontendUrl: string;
  apiUrl: string;
  apiPort: number;
  nodeEnv: 'development' | 'production';
  logLevel: string;

  // authentication
  authenticationProjectId: string;
  authenticationSecret: string;

  // cors
  apiCorsOrigin: string;
  apiCorsMethods: string;
  apiCoreAllowedHeaders: string[];

  // redis
  redisUrl: string;
  redisPoolMinimum: number;
  redisPoolMaximum: number;

  // session
  sessionEncryptionAlgorithm: string;
  sessionEncryptionKey: string;
  sessionEncryptionIvLength: number;
  sessionSecret: string;
  sessionMaximumAge: number;

  // database
  databaseHost: string;
  databasePort: number;
  databaseName: string;
  databaseUser: string;
  databasePassword: string;
  databasePoolMaximum: number;
  databaseIdleTimeout: number;
  databaseConnectionTimeout: number;
  databaseSsl: boolean;
}

export const applicationConfiguration: ApplicationConfiguration = {
  frontendUrl: process.env.FRONTEND_URL as string,
  apiUrl: process.env.API_URL as string,
  nodeEnv: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  apiPort: Number(process.env.API_PORT),
  logLevel: process.env.LOG_LEVEL as string,

  // authentication
  authenticationProjectId: process.env.AUTHENTICATION_PROJECT_ID as string,
  authenticationSecret: process.env.AUTHENTICATION_SECRET as string,

  // cors
  apiCorsOrigin: process.env.API_CORS_ORIGIN as string,
  apiCorsMethods: process.env.API_CORS_METHODS as string,
  apiCoreAllowedHeaders: (process.env.API_CORS_ALLOWED_HEADERS || '').split(','),

  // database
  databaseHost: process.env.DATABASE_HOST as string,
  databasePort: Number(process.env.DATABASE_PORT),
  databaseName: process.env.DATABASE_NAME as string,
  databaseUser: process.env.DATABASE_USER as string,
  databasePassword: process.env.DATABASE_PASSWORD as string,
  databasePoolMaximum: Number(process.env.DATABASE_POOL_MAXIMUM),
  databaseIdleTimeout: Number(process.env.DATABASE_IDLE_TIMEOUT),
  databaseConnectionTimeout: Number(process.env.DATABASE_CONNECTION_TIMEOUT),
  databaseSsl: process.env.DATABASE_SSL === '1',

  // redis
  redisUrl: process.env.REDIS_URL as string,
  redisPoolMinimum: Number(process.env.REDIS_POOL_MINIMUM),
  redisPoolMaximum: Number(process.env.REDIS_POOL_MAXIMUM),

  // session
  sessionEncryptionAlgorithm: process.env.SESSION_ENCRYPTION_ALGORITHM as string,
  sessionEncryptionKey: process.env.SESSION_ENCRYPTION_KEY as string,
  sessionEncryptionIvLength: Number(process.env.SESSION_ENCRYPTION_IV_LENGTH),
  sessionSecret: process.env.SESSION_SECRET as string,
  sessionMaximumAge: Number(process.env.SESSION_MAX_AGE),
};
