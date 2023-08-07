import { setupWorker, rest, RestRequest } from 'msw';

import { mockData } from '../api/mock-data';

const BASE_URL = import.meta.env.VITE_ALLMA_BASE_API_URL;

const ERROR_REGEX = /mockerror\|(.*)\|/;

const DEFAULT_DELAY = 500;

// since posting in a manual action, default these to be a little slow to be able to better see updating indicators
const DEFAULT_POST_DELAY = 1500;

let overrideDelays: Record<string, number> = {};

const delayRequest = async (request: RestRequest) => {
  const requestUrl = request.url.toString();
  const defaultDelay = request.method.toLowerCase() === 'post' ? DEFAULT_POST_DELAY : DEFAULT_DELAY;

  console.log(`api request to ${requestUrl} delayed for ${overrideDelays[requestUrl] ?? defaultDelay}`);

  await new Promise((resolve) => setTimeout(resolve, overrideDelays[requestUrl] ?? defaultDelay));
};

// since the payload can be anything we need to allow anything here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getForcedError = (checkData: any) => {
  const checkString = typeof checkData === 'string' ? checkData : JSON.stringify(checkData);
  const regex = checkString.match(ERROR_REGEX);

  return regex?.[1];
};

const restHandlers = [
  // query sandbox specific requests
  rest.get(`${BASE_URL}/sandbox/query*`, async (request, response, context) => {
    await delayRequest(request);

    const forcedError = getForcedError(request.url.toString());

    if (forcedError) {
      return response(context.status(500), context.json({}));
    }

    const filter = request.url.searchParams.get('filter');

    const data = [
      {
        id: '1',
      },
      {
        id: '2',
      },
    ];

    if (filter) {
      data.push({
        id: `filter given: ${filter}`,
      });
    }

    return response(
      context.status(200),
      context.json({
        query: data,
      }),
    );
  }),

  rest.post(`${BASE_URL}/sandbox/query*`, async (request, response, context) => {
    await delayRequest(request);

    const requestPayload = await request.json();
    const forcedError = getForcedError(requestPayload);

    if (forcedError) {
      return response(context.status(500), context.json({}));
    }

    return response(
      context.status(200),
      context.json({
        query: {
          id: requestPayload.id,
        },
      }),
    );
  }),
];

console.log(
  'mocked urls',
  restHandlers.map((handler) => {
    return [handler.info.method, handler.info.path];
  }),
);

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...restHandlers);

const reset = () => {
  overrideDelays = {};
};

const setOverrideDelay = (apiPath: string, delay: number) => {
  overrideDelays[`${BASE_URL}/${apiPath}`] = delay;
};

export const apiMocker = { reset, setOverrideDelay };
