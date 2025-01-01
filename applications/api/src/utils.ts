import type { ResponseStructure } from '$/apis/utils';

export const FAKER_STANDARD_SEED = 1;

const withResponseWrapper = <TResponseData>(data: TResponseData): ResponseStructure<TResponseData> => {
  const response: ResponseStructure<TResponseData> = {};

  if (data) {
    response.data = data;
  }

  return response;
};

export const mockServerUtils = {
  withResponseWrapper,
};
