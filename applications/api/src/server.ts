import cors from '@fastify/cors';
import dotenv from 'dotenv';
import fastify from 'fastify';

import { registerAuthenticateApi } from './apis/authenticate';
import { registerHealthApi } from './apis/health';
import { registerUsersApi } from './apis/users';
import { delayerHook } from './middleware/delayer';

dotenv.config();

const PORT = process.env.SERVER_PORT ?? 3000;

// set up the api
const api = fastify({ logger: true });

await api.register(cors, {
  origin: 'http://localhost:6006',
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true,
});

api.addHook('preHandler', delayerHook);

// register routes
registerHealthApi(api);
registerAuthenticateApi(api);
registerUsersApi(api);

// start the server
const start = async () => {
  try {
    await api.listen(PORT);
  } catch (err) {
    api.log.error(err);
    process.exit(1);
  }
};

start();
