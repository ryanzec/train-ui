import { HttpError, type HttpStatusCode } from '$/utils/error';

export type HttpRequest<TResponse> = Omit<RequestInit, 'credentials'> & {
  withCredentials?: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: since this for an api request which can basically have any data, any is valid in this case
  payload?: Record<string, any>;

  urlSearchParams?: URLSearchParams;

  // should return false to prevent further processing of the error
  onError?: (response: Response, responseJson: TResponse) => Promise<boolean>;
};

export type GraphqlRequest<T, K = undefined> = Omit<RequestInit, 'credentials'> & {
  query: string;
  variables?: K;
  withCredentials?: boolean;

  // should return false to prevent further processing of the error
  onError?: (response: Response, responseJson: T) => Promise<boolean>;
};

export const GraphqlErrorCode = {
  AUTH_NOT_AUTHORIZED: 'AUTH_NOT_AUTHORIZED',
} as const;

export type GraphqlErrorCode = (typeof GraphqlErrorCode)[keyof typeof GraphqlErrorCode];

export const HttpMethod = {
  CONNECT: 'CONNECT',
  DELETE: 'DELETE',
  GET: 'GET',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  TRACE: 'TRACE',
} as const;

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

const httpRequestInterceptors: Array<
  // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
  (requestOptions: HttpRequest<any>) => HttpRequest<any> | Promise<HttpRequest<any>>
> = [];
const httpResponseInterceptors: Array<
  // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
  (requestOptions: HttpRequest<any>, response: any, rawResponse: Response) => any | Promise<any>
> = [];

const addHttpRequestInterceptor = <TResponse>(
  // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
  interceptor: (requestOptions: HttpRequest<any>) => HttpRequest<TResponse> | Promise<HttpRequest<TResponse>>,
) => {
  httpRequestInterceptors.push(interceptor);
};

const removeHttpRequestInterceptor = <TResponse>(
  // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
  interceptor: (requestOptions: HttpRequest<any>) => HttpRequest<TResponse> | Promise<HttpRequest<TResponse>>,
) => {
  httpRequestInterceptors.push(interceptor);
};

const processRequestInterceptors = async <TResponse>(
  requestOptions: HttpRequest<TResponse>,
): Promise<HttpRequest<TResponse>> => {
  if (httpRequestInterceptors.length === 0) {
    return requestOptions;
  }

  let modifiedRequestOptions = requestOptions;

  for (let i = 0; i < httpRequestInterceptors.length; i++) {
    modifiedRequestOptions = await httpRequestInterceptors[i](modifiedRequestOptions);
  }

  return modifiedRequestOptions;
};

const addHttpResponseInterceptor = <TResponse>(
  interceptor: (
    // biome-ignore lint/suspicious/noExplicitAny: his handles generic requests so it needs to allow for any
    requestOptions: HttpRequest<any>,
    // biome-ignore lint/suspicious/noExplicitAny: his handles generic requests so it needs to allow for any
    response: any,
    rawResponse: Response,
  ) => TResponse | Promise<TResponse>,
) => {
  httpResponseInterceptors.push(interceptor);
};

const removeHttpResponseInterceptor = <TResponse>(
  interceptor: (
    // biome-ignore lint/suspicious/noExplicitAny: his handles generic requests so it needs to allow for any
    requestOptions: HttpRequest<any>,
    // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
    response: any,
    rawResponse: Response,
  ) => TResponse | Promise<TResponse>,
) => {
  httpResponseInterceptors.push(interceptor);
};

const processResponseInterceptors = async <TResponse>(
  requestOptions: HttpRequest<TResponse>,
  response: TResponse,
  rawResponse: Response,
): Promise<TResponse> => {
  if (httpResponseInterceptors.length === 0) {
    return response;
  }

  let modifiedResponse = response;

  for (let i = 0; i < httpResponseInterceptors.length; i++) {
    modifiedResponse = await httpResponseInterceptors[i](requestOptions, modifiedResponse, rawResponse);
  }

  return modifiedResponse;
};

const http = async <TResponse>(url: string, requestOptions: HttpRequest<TResponse> = {}): Promise<TResponse> => {
  const finalRequestOptions = await processRequestInterceptors(requestOptions);
  const { withCredentials, payload, headers, onError, ...defaultOptions } = finalRequestOptions;

  const fetchOptions: RequestInit = {
    ...defaultOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: withCredentials !== false ? 'include' : 'same-origin',
    mode: 'cors',
  };

  if (payload) {
    fetchOptions.body = JSON.stringify(payload);
  }

  const finalUrl = requestOptions.urlSearchParams ? `${url}?${requestOptions.urlSearchParams.toString()}` : url;
  const rawResponse = await fetch(finalUrl, fetchOptions);
  const jsonResponse = await rawResponse.json();
  const finalJsonResponse = await processResponseInterceptors(finalRequestOptions, jsonResponse, rawResponse);

  if (!rawResponse.ok) {
    let throwError = true;

    if (onError) {
      throwError = await onError(rawResponse, finalJsonResponse);
    }

    if (throwError) {
      throw new HttpError(rawResponse.status as HttpStatusCode, {
        message: `http request failed with: ${rawResponse.status} ${rawResponse.statusText}`,
        context: {
          url,
          requestOptions,
          jsonResponse: finalJsonResponse,
        },
      });
    }
  }

  return finalJsonResponse;
};

export const httpUtils = {
  http,
  addHttpRequestInterceptor,
  addHttpResponseInterceptor,
  removeHttpRequestInterceptor,
  removeHttpResponseInterceptor,
};
