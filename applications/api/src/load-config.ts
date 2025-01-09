import path from 'node:path';
import url from 'node:url';
import dotenv from 'dotenv';
import type { ApplicationConfiguration } from './types';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

export const applicationConfiguration: ApplicationConfiguration = {
  STYTCH_PROJECT_ID: process.env.AUTH_PROJECT_ID || '',
  STYTCH_SECRET: process.env.AUTH_SECRET || '',
  FRONTEND_URL: 'http://localhost:4000',
  BACKEND_URL: 'http://localhost:3000',
  NODE_ENV: (process.env.NODE_ENV as 'development' | 'production') || 'development',
  PORT: Number.parseInt(process.env.PORT || '3000', 10),
};
