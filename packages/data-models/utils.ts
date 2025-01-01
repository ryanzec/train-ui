import type { CommonDataType } from '$/types/generic';

export type ResponseError = {
  message: string;
  [key: string]: CommonDataType;
};

export type ResponseMeta = {
  total?: number;
  currentLastItemCount?: number;
  [key: string]: CommonDataType | undefined;
};

export type ResponseWrapper<TResponseData> = {
  data?: TResponseData;
  meta?: ResponseMeta;
  error?: ResponseError;
};
