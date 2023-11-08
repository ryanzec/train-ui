import { FastifyInstance, FastifyRequest } from 'fastify';

export const registerQueryApi = (api: FastifyInstance) => {
  api.get('/sandbox/query', async (request, response) => {
    // @ts-expect-error
    const filter = request.query.filter;

    const data = {
      query: [
        {
          id: '1',
        },
        {
          id: '2',
        },
      ],
    };

    if (filter) {
      data.query.push({
        id: `filter given: ${filter}`,
      });
    }

    return response.status(200).send(data);
  });

  type PostRequest = FastifyRequest<{
    Body: { id: string };
  }>;

  api.post('/sandbox/query', async (request: PostRequest, response) => {
    const keys = Object.keys(request.body);

    if (!keys.includes('id') || request.id === 'error') {
      return response.code(400).send();
    }

    return response.code(200).send({ query: { id: request.id } });
  });
};
