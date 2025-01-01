export type ResponseError = {
  message: string;
  meta?: {
    // biome-ignore lint/suspicious/noExplicitAny: this is generic so we need to allow any type
    [key: string]: any;
  };
};

export type ResponseMeta = {
  currentPage?: number;
  totalPageCount?: number;
  totalItemCount?: number;
  itemsPerPage?: number;

  // biome-ignore lint/suspicious/noExplicitAny: this is generic so we need to allow any type
  [key: string]: any;
};

export type ResponseStructure<TData> = {
  data?: TData;
  meta?: ResponseMeta;
  error?: ResponseError;
};
