import type { FastifyBaseLogger } from 'fastify';
import type { LoggerOptions } from 'pino';

const loggerConfiguration: LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  redact: [
    'req.headers.authorization',
    'req.headers.cookie',
    'req.body.password',
    'req.body.token',
    'req.body.secret',
    'req.body.creditCard',
    'req.params.password',
    'res.headers["set-cookie"]',
  ],
  serializers: {
    req(request) {
      return {
        method: request.method,
        url: request.url,
        hostname: request.hostname,
        remoteAddress: request.ip,
      };
    },
    res(reply) {
      return {
        statusCode: reply.statusCode,
      };
    },
  },
  customLevels: {
    audit: 35,
  },
  transport: {
    target: 'pino-pretty',
  },
};

let globalLogger: FastifyBaseLogger | undefined = undefined;

export const loggerUtils = {
  loggerConfiguration,
  setLogger: (logger: FastifyBaseLogger) => {
    globalLogger = logger;
  },
  getLogger: () => {
    if (!globalLogger) {
      throw new Error('attempt to log something before fastify logger is ready which should not happen');
    }

    return globalLogger;
  },
};
