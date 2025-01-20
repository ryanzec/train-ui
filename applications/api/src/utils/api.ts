import type { ResponseStructure } from '$/apis/utils';

const respondWithData = <TResponseData>(data: TResponseData): ResponseStructure<TResponseData> => {
  const response: ResponseStructure<TResponseData> = {};

  if (data) {
    response.data = data;
  }

  return response;
};

const respondWithError = <TResponseData>(
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

export const apiUtils = {
  respondWithData,
  respondWithError,
};
