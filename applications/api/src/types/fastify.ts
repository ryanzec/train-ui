// biome-ignore lint/correctness/noUnusedImports: this is needed for the modification to the session object interface
import type { FastifyRequest } from 'fastify';

declare module '@fastify/session' {
  interface FastifySessionObject {
    authenticationToken: string;
    organizationId: string;
    userId: string;
  }
}
