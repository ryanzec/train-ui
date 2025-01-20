import { apiRoutes } from '$api/types/api';
import type { FastifyInstance } from 'fastify';

export const registerHealthApi = (api: FastifyInstance) => {
  api.get(apiRoutes.HEALTH, async (_request_, response) => {
    return response.status(200).send({});
  });
};
