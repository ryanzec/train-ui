import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastifySession from '@fastify/session';
import { RedisStore } from 'connect-redis';
import fastify from 'fastify';
import { createClient } from 'redis';

import { registerAuthenticateApi } from '$api/apis/authenticate';
import { registerHealthApi } from '$api/apis/health';
import { registerQueryApi } from '$api/apis/query';
import { registerRedisApi } from '$api/apis/redis';
import { registerUsersApi } from '$api/apis/users';
import { applicationConfiguration } from '$api/load-config';
import { delayerHook } from '$api/middleware/delayer';
import { mockerrorHook } from '$api/middleware/mockerror';
import { type EncryptionOptions, encryptionUtils } from '$api/utils/encryption';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const api = fastify({
  logger: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'ssl-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'ssl-cert.pem')),
  },
});

const getRedisSessionClient = async () => {
  const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
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
  origin: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true,
});

api.register(fastifyCookie);

api.addHook('preHandler', delayerHook);
api.addHook('preHandler', mockerrorHook);

// register routes
registerHealthApi(api);
registerAuthenticateApi(api);
registerUsersApi(api);
registerQueryApi(api);
registerRedisApi(api);

const sessionEncryptionOptions: EncryptionOptions = {
  algorithm: process.env.SESSION_ENCRYPTION_ALGORITHM as string,
  key: Buffer.from(process.env.SESSION_ENCRYPTION_KEY as string),
  ivLength: Number(process.env.SESSION_ENCRYPTION_IV_LENGTH),
};

// start the server
const start = async () => {
  try {
    // not await the redis client connection will cause weird errors when running the server
    const redisClient = await getRedisSessionClient();

    api.register(fastifySession, {
      secret: 'a secret with minimum length of 32 characters',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
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
              console.error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'unknown error'}`);

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
              console.error(`Failed to stringify JSON: ${error instanceof Error ? error.message : 'unknown error'}`);

              return '';
            }
          },
        },
      }),
    });

    api.listen({ port: 3000 });
  } catch (err) {
    api.log.error(err);
    process.exit(1);
  }
};

start();
