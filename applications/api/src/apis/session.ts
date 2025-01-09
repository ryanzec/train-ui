import type { FastifyInstance } from 'fastify';

export const registerSessionApi = (api: FastifyInstance) => {
  api.get('/session/test', async (request, response) => {
    const current = request.session.views || 0;
    request.session.views = current + 1;
    response.status(200).send({
      message: `You've viewed this page ${request.session.views} times.`,
      sessionId: request.session.sessionId,
      cookies: request.cookies,
    });
  });
};
