import type { FastifyInstance } from 'fastify';

import { mathUtils } from '$/utils/math';
import { redisUtils } from '$api/utils/redis';

export const registerRedisApi = (api: FastifyInstance) => {
  api.get('/api/redis/set', async (_request_, response) => {
    const userData = await redisUtils.manageConnection(async (redisConnection) => {
      await redisConnection.hSet('user:123', {
        username: 'john_doe',
        email: 'john@example.com',
        age: 30,
      });

      return await redisConnection.hGetAll('user:123');
    });

    return response.status(200).send({ data: userData });
  });

  api.get('/api/redis/delete', async (_request_, response) => {
    const userData = await redisUtils.manageConnection(async (redisConnection) => {
      const userData = await redisConnection.hGetAll('user:123');

      await redisConnection.del('user:123');

      return userData;
    });

    return response.status(200).send({ data: userData });
  });

  // using util methods that handle connection management
  api.get('/api/redis/update', async (_request_, response) => {
    const userData = await redisUtils.manageConnection(async (redisConnection) => {
      await redisConnection.hSet('user:123', {
        age: mathUtils.randomInteger(1, 100000),
      });

      return await redisConnection.hGetAll('user:123');
    });

    return response.status(200).send({ data: userData });
  });
};
