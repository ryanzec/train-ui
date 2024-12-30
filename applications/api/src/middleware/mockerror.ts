import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

export const mockerrorHook = (request: FastifyRequest, response: FastifyReply, done: HookHandlerDoneFunction) => {
  const bodyString = JSON.stringify(request.body ?? {});

  if (bodyString.includes('mockerror')) {
    return response.status(400).send({ error: 'Mock error triggered' });
  }

  // Proceed to the next middleware or route handler
  done();
};
