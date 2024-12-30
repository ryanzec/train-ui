import cors from '@fastify/cors';
import dotenv from 'dotenv';
import fastify from 'fastify';

import { registerAuthenticateApi } from './apis/authenticate';
import { registerHealthApi } from './apis/health';
import { registerQueryApi } from './apis/query';
import { registerUsersApi } from './apis/users';
import { delayerHook } from './middleware/delayer';
import { mockerrorHook } from './middleware/mockerror';

dotenv.config();

const PORT = process.env.SERVER_PORT ?? 3000;

// set up the api
const api = fastify();

await api.register(cors, {
  origin: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true,
});

api.addHook('preHandler', delayerHook);
api.addHook('preHandler', mockerrorHook);

// register routes
registerHealthApi(api);
registerAuthenticateApi(api);
registerUsersApi(api);
registerQueryApi(api);

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
