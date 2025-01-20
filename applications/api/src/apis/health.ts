import { apiRoutes } from '$api/types/api';
import type { HealthCheckRequest, HealthCheckResponse } from '$api/types/health';
import { apiUtils } from '$api/utils/api';
import type { FastifyInstance } from 'fastify';

export const registerHealthApi = (api: FastifyInstance) => {
  type GetHealth = {
    Body: HealthCheckRequest;
    Reply: HealthCheckResponse;
  };

  api.get<GetHealth>(apiRoutes.HEALTH, async (_request_, response) => {
    return response.status(200).send(apiUtils.respondWithData({ status: 'ok' }));
  });
};
