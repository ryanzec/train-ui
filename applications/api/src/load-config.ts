import path from 'node:path';
import url from 'node:url';
import dotenv from 'dotenv';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const requiredEnvironmentVariables = [
  'SESSION_ENCRYPTION_ALGORITHM',
  'SESSION_ENCRYPTION_KEY',
  'SESSION_ENCRYPTION_IV_LENGTH',
];

for (const variable of requiredEnvironmentVariables) {
  if (process.env[variable]) {
    continue;
  }

  console.error(`missing required environment variable '${variable}' so can not start api server`);

  process.exit(1);
}

export interface ApplicationConfiguration {
  AUTH_PROJECT_ID: string;
  AUTH_SECRET: string;
  FRONTEND_URL: string;
  BACKEND_URL: string;
  NODE_ENV: 'development' | 'production';
  PORT: number;
}

export const applicationConfiguration: ApplicationConfiguration = {
  AUTH_PROJECT_ID: process.env.AUTH_PROJECT_ID || '',
  AUTH_SECRET: process.env.AUTH_SECRET || '',
  FRONTEND_URL: 'https://localhost:4000',
  BACKEND_URL: 'https://localhost:3000',
  NODE_ENV: (process.env.NODE_ENV as 'development' | 'production') || 'development',
  PORT: Number.parseInt(process.env.PORT || '3000', 10),
};
