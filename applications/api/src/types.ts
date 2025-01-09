import { FastifyRequest } from 'fastify';

export type AuthenticationToken = {
  authenticationToken: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

declare module '@fastify/session' {
  interface FastifySessionObject {
    views: number;
    stytchSessionToken: string;
  }
}

export interface ApplicationConfiguration {
  STYTCH_PROJECT_ID: string;
  STYTCH_SECRET: string;
  FRONTEND_URL: string;
  BACKEND_URL: string;
  NODE_ENV: 'development' | 'production';
  PORT: number;
}
