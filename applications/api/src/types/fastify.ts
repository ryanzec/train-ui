import { FastifyRequest } from 'fastify';

declare module '@fastify/session' {
  interface FastifySessionObject {
    authenticationToken: string;
  }
}
