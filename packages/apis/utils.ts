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

// @todo the idea is to be able to type this to disallow keys that are not part of the generic but not sure how
// @todo to do that so keeping this here until I do as once I can, the change only has to happen here
export type RequestStructure<TData> = TData;
