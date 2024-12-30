import type { ResponseWrapper } from '$/data-models/utils';

export const FAKER_STANDARD_SEED = 1;

const withResponseWrapper = <TResponseData>(data: TResponseData): ResponseWrapper<TResponseData> => {
  const response: ResponseWrapper<TResponseData> = {};

  if (data) {
    response.data = data;
  }

  return response;
};

export const mockServerUtils = {
  withResponseWrapper,
};
