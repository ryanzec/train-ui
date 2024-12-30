import type { CommonDataType } from '$/types/generic';

export interface ResponseError {
  message: string;
  [key: string]: CommonDataType;
}

export interface ResponseMeta {
  total?: number;
  currentLastItemCount?: number;
  [key: string]: CommonDataType | undefined;
}

export interface ResponseWrapper<TResponseData> {
  data?: TResponseData;
  meta?: ResponseMeta;
  error?: ResponseError;
}
