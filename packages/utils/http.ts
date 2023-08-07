import { HttpError } from '$/utils/error';

export interface HttpRequest<TResponse> extends Omit<RequestInit, 'credentials'> {
  withCredentials?: boolean;
  // since this for an api request which can basically have any data, any is valid in this case
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: Record<string, any>;

  // should return false to prevent further processing of the error
  onError?: (response: Response, responseJson: TResponse) => Promise<boolean>;
}

export interface GraphqlRequest<T, K = undefined> extends Omit<RequestInit, 'credentials'> {
  query: string;
  variables?: K;
  withCredentials?: boolean;

  // should return false to prevent further processing of the error
  onError?: (response: Response, responseJson: T) => Promise<boolean>;
}

export enum GraphqlErrorCode {
  AUTH_NOT_AUTHORIZED = 'AUTH_NOT_AUTHORIZED',
}

export enum HttpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

const httpRequestInterceptors: Array<(requestOptions: HttpRequest<any>) => HttpRequest<any>> = [];
const httpResponseInterceptors: Array<(requestOptions: HttpRequest<any>, response: any) => any> = [];

const addHttpRequestInterceptor = <TResponse>(interceptor: () => HttpRequest<TResponse>) => {
  httpRequestInterceptors.push(interceptor);
};

const removeHttpRequestInterceptor = <TResponse>(interceptor: () => HttpRequest<TResponse>) => {
  httpRequestInterceptors.push(interceptor);
};

const processRequestInterceptors = <TResponse>(requestOptions: HttpRequest<TResponse>): HttpRequest<TResponse> => {
  if (httpRequestInterceptors.length === 0) {
    return requestOptions;
  }

  let modifiedRequestOptions = requestOptions;

  for (let i = 0; i < httpRequestInterceptors.length; i++) {
    modifiedRequestOptions = httpRequestInterceptors[i](modifiedRequestOptions);
  }

  return modifiedRequestOptions;
};

const addHttpResponseInterceptor = <TResponse>(interceptor: () => TResponse) => {
  httpResponseInterceptors.push(interceptor);
};

const removeHttpResponseInterceptor = <TResponse>(interceptor: () => TResponse) => {
  httpResponseInterceptors.push(interceptor);
};

const processResponseInterceptors = <TResponse>(
  requestOptions: HttpRequest<TResponse>,
  response: TResponse,
): TResponse => {
  if (httpResponseInterceptors.length === 0) {
    return response;
  }

  let modifiedResponse = response;

  for (let i = 0; i < httpResponseInterceptors.length; i++) {
    modifiedResponse = httpResponseInterceptors[i](requestOptions, modifiedResponse);
  }

  return modifiedResponse;
};

// since this is a response from an api request, any is valid in this case
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const graphqlRequestWasAuthorized = (responseBody: any) => {
  let isAuthorized = true;

  if (!responseBody.errors || !Array.isArray(responseBody.errors) || responseBody.errors.length === 0) {
    return isAuthorized;
  }

  for (let i = 0; i < responseBody.errors.length; i++) {
    if (responseBody.errors[i].extensions?.code !== GraphqlErrorCode.AUTH_NOT_AUTHORIZED) {
      continue;
    }

    isAuthorized = false;

    break;
  }

  return isAuthorized;
};

const http = async <TResponse>(url: string, requestOptions: HttpRequest<TResponse> = {}): Promise<TResponse> => {
  const finalRequestOptions = processRequestInterceptors(requestOptions);
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

  const response = await fetch(url, fetchOptions);
  const jsonResponse = await response.json();
  const finalJsonResponse = processResponseInterceptors(finalRequestOptions, jsonResponse);

  if (!response.ok) {
    let throwError = true;

    if (onError) {
      throwError = await onError(response, finalJsonResponse);
    }

    if (throwError) {
      throw new HttpError(response.status, {
        message: `http request failed with: ${response.status} ${response.statusText}`,
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

const graphql = async <T, K = undefined>(url: string, graphqlOptions: GraphqlRequest<T, K>): Promise<T> => {
  const { query, variables, method, ...defaultOptions } = graphqlOptions;
  const requestOptions: HttpRequest<T> = {
    ...defaultOptions,
    // we want to default graphql methods to POST since that is what they generally are
    method: method ?? HttpMethod.POST,
    payload: {
      query,
      variables: variables ?? {},
    },
  };

  const response = await http<T>(url, requestOptions);

  if (!graphqlRequestWasAuthorized(response)) {
    throw new HttpError(401, { message: `http request failed with: 401 Unauthorized` });
  }

  return response;
};

export const httpUtils = {
  http,
  graphql,
};
