import type { ResponseStructure } from '$/apis/utils';
import { ErrorMessage } from '$api/utils/error';
import { loggerUtils } from '$api/utils/logger';
import type { FastifyReply } from 'fastify';

const buildDataResponse = <TResponseData>(data: TResponseData): ResponseStructure<TResponseData> => {
  const response: ResponseStructure<TResponseData> = {};

  if (data) {
    response.data = data;
  }

  return response;
};

const buildErrorResponse = <TResponseData>(
  error: unknown,
  errorMessage = 'unknown error',
): ResponseStructure<TResponseData> => {
  if (error instanceof Error) {
    return {
      error: {
        message: error.message,
      },
    };
  }

  return {
    error: {
      message: errorMessage,
    },
  };
};

type RespondWithErrorOptions = {
  error?: unknown;
  errorMessage?: string;
  statusCode?: number;
};

const defaultRespondWithErrorOptions: Required<Omit<RespondWithErrorOptions, 'error'>> = {
  errorMessage: ErrorMessage.UNKNOWN,
  statusCode: 500,
};

const respondWithError = (response: FastifyReply, overrideOptions: RespondWithErrorOptions = {}): FastifyReply => {
  const options = structuredClone(Object.assign({}, defaultRespondWithErrorOptions, overrideOptions));
  const finalError = options.error instanceof Error ? options.error : new Error(options.errorMessage);

  loggerUtils.getLogger().error(finalError);

  return response.code(options.statusCode).send(apiUtils.buildErrorResponse(finalError));
};

export const apiUtils = {
  buildDataResponse,
  buildErrorResponse,
  respondWithError,
};
