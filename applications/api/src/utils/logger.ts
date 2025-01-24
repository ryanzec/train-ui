import type { FastifyBaseLogger } from 'fastify';
import pino, { type Logger, type LoggerOptions } from 'pino';

const loggerConfiguration: LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  redact: {
    paths: ['req.headers.authorization', 'req.headers["x-api-key"]', 'req.body.password'],
    censor: '**REDACTED**',
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
