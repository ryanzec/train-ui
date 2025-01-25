import { applicationConfiguration } from '$api/utils/application-configuration';
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
  formatters: {
    log: (obj) => {
      return Object.fromEntries(
        // by keeping values that are undefined, this can make is easier to spot missing things in the logs
        Object.entries(obj).map(([key, value]) => {
          return [key, value === undefined ? 'undefined' : value];
        }),
      );
    },
  },
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
    // since in production logs should be sent somewhere that offer better search-ability, we can use the default
    // transport target, pretty is mainly useful for local development
    target: applicationConfiguration.nodeEnv === 'development' ? 'pino-pretty' : 'pino/file',
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
  // biome-ignore lint/suspicious/noExplicitAny: since this is a generic system, we need to allow any
  logObjectFormatted: (message: string, object: Record<string, any>) => {
    return {
      // the msg ket is a specific key used by pino for better output in the logs
      msg: `${message}:`,
      ...object,
    };
  },
};
