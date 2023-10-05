import { FastifyInstance } from 'fastify';

export const registerHealthApi = (api: FastifyInstance) => {
  api.get('/api/health', async (request, response) => {
    return response.status(200).send({});
  });
};
