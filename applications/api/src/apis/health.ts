import { FastifyInstance } from 'fastify';

export const registerHealthApi = (api: FastifyInstance) => {
  api.get('/api/health', async (_request_, response) => {
    return response.status(200).send({});
  });
};
