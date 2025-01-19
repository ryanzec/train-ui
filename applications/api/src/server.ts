import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifySession from '@fastify/session';
import fastify from 'fastify';

import { registerAuthenticateApi } from '$api/apis/authenticate';
import { registerHealthApi } from '$api/apis/health';
import { registerQueryApi } from '$api/apis/query';
import { registerRedisApi } from '$api/apis/redis';
import { registerSessionApi } from '$api/apis/session';
import { registerUsersApi } from '$api/apis/users';
import { applicationConfiguration } from '$api/load-config';
import { delayerHook } from '$api/middleware/delayer';
import { mockerrorHook } from '$api/middleware/mockerror';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set up the api
const api = fastify({
  https: {
    key: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'ssl-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'ssl-cert.pem')),
  },
});

await api.register(cors, {
  origin: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true,
});

api.register(fastifyCookie);
api.register(fastifySession, {
  secret: 'a secret with minimum length of 32 characters',
  cookie: {
    maxAge: 1000 * 60,
  },
  saveUninitialized: false,
});

api.addHook('preHandler', delayerHook);
api.addHook('preHandler', mockerrorHook);

// register routes
registerHealthApi(api);
registerAuthenticateApi(api);
registerUsersApi(api);
registerQueryApi(api);
registerSessionApi(api);
registerRedisApi(api);

// start the server
const start = async () => {
  try {
    api.listen({ port: applicationConfiguration.PORT });
  } catch (err) {
    api.log.error(err);
    process.exit(1);
  }
};

start();
