import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

import { loggerUtils } from '$api/utils/logger';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifySession from '@fastify/session';
import fastifyWebsocket from '@fastify/websocket';
import { RedisStore } from 'connect-redis';
import fastify from 'fastify';
import { createClient } from 'redis';

import * as process from 'node:process';
import { registerAuthenticateApi } from '$api/apis/authenticate';
import { registerHealthApi } from '$api/apis/health';
import { registerQueryApi } from '$api/apis/query';
import { registerRedisApi } from '$api/apis/redis';
import { registerUsersApi } from '$api/apis/users';
import { delayerHook } from '$api/middleware/delayer';
import { mockerrorHook } from '$api/middleware/mockerror';
import { applicationConfiguration } from '$api/utils/application-configuration';
import { type EncryptionOptions, encryptionUtils } from '$api/utils/encryption';
import { registerWsWebsocket } from '$api/websockets/ws';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const api = fastify({
  logger: loggerUtils.loggerConfiguration,
  https: {
    key: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'ssl-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'ssl-cert.pem')),
  },
});

loggerUtils.setLogger(api.log);

const getRedisSessionClient = async () => {
  const client = createClient({
    url: applicationConfiguration.redisUrl,
    socket: {
      reconnectStrategy: (retries: number) => {
        return Math.min(retries * 50, 3000);
      },
    },
  });

  await client.connect();

  return client;
};

await api.register(cors, {
  origin: applicationConfiguration.apiCorsOrigin,
  methods: applicationConfiguration.apiCorsMethods,
  allowedHeaders: applicationConfiguration.apiCoreAllowedHeaders,
  optionsSuccessStatus: 200,
  credentials: true,
});

api.register(fastifyCookie);
api.register(fastifyWebsocket);

if (process.env.NODE_ENV === 'development') {
  api.addHook('preHandler', delayerHook);
}

api.addHook('preHandler', mockerrorHook);

registerWsWebsocket(api);

// register routes
registerHealthApi(api);
registerAuthenticateApi(api);
registerUsersApi(api);
registerQueryApi(api);
registerRedisApi(api);

const sessionEncryptionOptions: EncryptionOptions = {
  algorithm: applicationConfiguration.sessionEncryptionAlgorithm,
  key: Buffer.from(applicationConfiguration.sessionEncryptionKey),
  ivLength: Number(applicationConfiguration.sessionEncryptionIvLength),
};

// start the server
const start = async () => {
  try {
    // not await the redis client connection will cause weird errors when running the server
    const redisClient = await getRedisSessionClient();

    api.register(fastifySession, {
      secret: applicationConfiguration.sessionSecret,
      cookie: {
        maxAge: applicationConfiguration.sessionMaximumAge,
        secure: true,
        sameSite: 'none',
      },
      saveUninitialized: false,
      store: new RedisStore({
        client: redisClient,
        prefix: 'session:',
        serializer: {
          parse: (value: string): object => {
            try {
              // since the encrypted value has it own structure we have to parse the string that it stores to be
              // able to property decrypt it
              const decrypted = encryptionUtils.decrypt(JSON.parse(value), sessionEncryptionOptions);

              return JSON.parse(decrypted);
            } catch (error: unknown) {
              api.log.error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'unknown error'}`);

              return {};
            }
          },
          stringify: (value: unknown): string => {
            try {
              // for the encryption to work, we need to stringify the object before encrypting and the encryption
              // results in another object that has meta data needed to decrypt the data
              const jsonString = JSON.stringify(value);

              return JSON.stringify(encryptionUtils.encrypt(jsonString, sessionEncryptionOptions));
            } catch (error: unknown) {
              api.log.error(`Failed to stringify JSON: ${error instanceof Error ? error.message : 'unknown error'}`);

              return '';
            }
          },
        },
      }),
    });

    api.listen({ port: applicationConfiguration.apiPort });
  } catch (err) {
    api.log.error(err);
    process.exit(1);
  }
};

start();
