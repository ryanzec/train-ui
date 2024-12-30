import { FastifyInstance } from 'fastify';

export const registerQueryApi = (api: FastifyInstance) => {
  type GetQuery = {
    Querystring: { filter?: string };
  };

  api.get<GetQuery>('/sandbox/query', async (request, response) => {
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

  type PostQuery = {
    Body: { id: string };
  };

  api.post<PostQuery>('/sandbox/query', async (request, response) => {
    const keys = Object.keys(request.body);

    if (!keys.includes('id') || request.id === 'error') {
      return response.code(400).send();
    }

    return response.code(200).send({ query: { id: request.body.id } });
  });
};
