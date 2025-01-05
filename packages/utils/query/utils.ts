import {
  type Accessor,
  type Resource,
  type ResourceOptions,
  type Setter,
  batch,
  createReaction,
  createResource,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js';

import type { CommonDataType } from '$/types/generic';
import { cryptoUtils } from '$/utils/crypto';

type TrackedMutators = Record<string, Setter<CommonDataType | undefined>>;
type TrackedRefetchers = Record<string, ResourceRefetcher<CommonDataType>>;
type TrackedResources = Record<string, Resource<CommonDataType>>;
type CachedData = Record<
  string,
  {
    expires?: number;
    data?: CommonDataType;
  }
>;
type TrackedShouldFetch = Record<string, [Accessor<boolean>, Setter<boolean>]>;

export type QueryData = {
  trackedMutators: TrackedMutators;
  trackedRefetchers: TrackedRefetchers;
  trackedResources: TrackedResources;
  cachedData: CachedData;
  trackedShouldFetch: TrackedShouldFetch;
};

// global data trackers for query system
const _queryData: QueryData = {
  trackedMutators: {},
  trackedRefetchers: {},
  trackedResources: {},
  cachedData: {},
  trackedShouldFetch: {},
};

export enum ResourceState {
  UNRESOLVED = 'unresolved',
  PENDING = 'pending',
  READY = 'ready',
  ERRORED = 'errored',

  // naming the const REFETCHING even though the state is refreshing as everything else but the state name refers
  // this action as refetching
  REFETCHING = 'refreshing',
}

export type MutatorFunction<TMutateInput, TMutateReturn> = (info: TMutateInput) => Promise<TMutateReturn>;

export enum MutationState {
  IDLE = 'idle',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type CreateMutationReturns<TMutateInput, TMutateResult> = {
  mutate: (input: TMutateInput) => Promise<void>;
  state: Accessor<MutationState>;
  result: Accessor<TMutateResult | undefined>;
};

export type CreateMutationOptions<TMutationInput, TMutationResult> = {
  onSuccess?: (mutateResponse: TMutationResult) => Promise<void> | void;
  onMutate?: (mutateInput: TMutationInput) => Promise<void> | void;
  onError?: (mutateInput: TMutationInput, error: unknown) => Promise<boolean | void> | boolean | void;
};

export type QueryCacheKey = [string] | [string, () => CommonDataType];

export const buildDataCacheKey = (primaryKey: string, secondaryKey?: () => CommonDataType) => {
  if (secondaryKey) {
    return `${primaryKey}:${cryptoUtils.hashData(secondaryKey())}`;
  }

  return primaryKey;
};

// returning this as an array, which is desired to allow for easier renaming of returned values, seems to require
// an explicit return type instead of just inferring it
export const createMutation = <TMutateInput, TMutateResult>(
  mutator: MutatorFunction<TMutateInput, TMutateResult>,
  options: CreateMutationOptions<TMutateInput, TMutateResult> = {},
): CreateMutationReturns<TMutateInput, TMutateResult> => {
  const [state, setState] = createSignal<MutationState>(MutationState.IDLE);
  const [result, setResult] = createSignal<TMutateResult>();

  const mutate = async (input: TMutateInput) => {
    setState(MutationState.PROCESSING);

    await options.onMutate?.(input);

    try {
      const response = await mutator(input);

      batch(() => {
        // biome-ignore lint/complexity/noBannedTypes: not sure why but need this case to make sure typescript does not complain
        setResult(response as Exclude<TMutateResult, Function>);
        setState(MutationState.SUCCESS);
      });

      await options.onSuccess?.(response);

      setState(MutationState.IDLE);
    } catch (error) {
      setState(MutationState.ERROR);

      let rethrowError = true;

      if (options.onError) {
        const onErrorResult = await options.onError(input, error);

        rethrowError = onErrorResult !== false;
      }

      if (rethrowError) {
        throw error;
      }

      setState(MutationState.IDLE);
    }
  };

  return { mutate, state, result };
};

export const addTrackedMutator = (queryData: QueryData, key: string, setter: Setter<CommonDataType | undefined>) => {
  if (queryData.trackedMutators[key]) {
    return;
  }

  queryData.trackedMutators[key] = setter;
};

export const removeTrackedMutator = (queryData: QueryData, key: string) => {
  delete queryData.trackedMutators[key];
};

export type TriggerMutateMutator<TData> = (oldValue: TData) => TData;

export const triggerMutator = <TData>(
  queryData: QueryData,
  queryKey: () => QueryCacheKey,
  callback: TriggerMutateMutator<TData>,
) => {
  const [primaryKey] = queryKey();

  if (!queryData.trackedMutators[primaryKey]) {
    return;
  }

  queryData.trackedMutators[primaryKey](callback);

  // not sure how to better handle this without the cast as the cached data is a common pool and can't be typed
  // to a specific resource data type
  setCachedData(queryData, queryKey, getTrackedResource(queryData, primaryKey)?.() as CommonDataType);
};

export type ResourceRefetcher<TResource> = (info?: unknown) => TResource | Promise<TResource> | undefined | null;

export const addTrackedRefetcher = <TResource>(
  queryData: QueryData,
  key: string,
  setter: ResourceRefetcher<TResource>,
) => {
  if (queryData.trackedRefetchers[key]) {
    return;
  }

  // not sure how to better handle this without the cast as the the data of the resource is is a common pool and
  // can't be typed to a specific resource data type
  queryData.trackedRefetchers[key] = setter as ResourceRefetcher<CommonDataType>;
};

export const removeTrackedRefetcher = (queryData: QueryData, key: string) => {
  delete queryData.trackedRefetchers[key];
};

type TriggerRefetcherOptions = {
  info?: unknown;
  secondaryKey?: () => CommonDataType;
};

export const triggerRefetcher = async (queryData: QueryData, key: string, options: TriggerRefetcherOptions = {}) => {
  if (!queryData.trackedRefetchers[key]) {
    return;
  }

  const cachedData = getCachedData(queryData, buildDataCacheKey(key, options.secondaryKey));

  if (cachedData && queryData.trackedMutators[key]) {
    const queryKey: QueryCacheKey = !options.secondaryKey ? [key] : [key, options.secondaryKey];

    // use the mutator to set the resource value to want was found in cache
    triggerMutator(
      queryData,
      () => queryKey,
      () => cachedData.data,
    );

    return;
  }

  const [shouldFetch, setShouldFetch] = getTrackedShouldFetch(queryData, key);

  if (!shouldFetch()) {
    // setting this to true will automatically trigger the fetching of data so we don't have to call the refetch
    // manually in this case
    setShouldFetch(true);

    return;
  }

  return queryData.trackedRefetchers[key](options.info);
};

export const setCachedData = (
  queryData: QueryData,
  queryKey: () => QueryCacheKey,
  data: CommonDataType,
  timeToLive?: number,
) => {
  const [primaryKey, secondaryKey] = queryKey();
  const key = buildDataCacheKey(primaryKey, secondaryKey);

  if (!queryData.cachedData[key]) {
    queryData.cachedData[key] = {};
  }

  queryData.cachedData[key].data = data;

  if (timeToLive) {
    const currentTime = new Date().getTime();

    queryData.cachedData[key].expires = currentTime + timeToLive;
  }
};

export const removeCachedData = (queryData: QueryData, key: string) => {
  delete queryData.cachedData[key];
};

export const getCachedData = (queryData: QueryData, key: string) => {
  const currentTime = new Date().getTime();

  // @todo (fix) investigate why we need ! here

  if (
    !queryData.cachedData[key] ||
    !queryData.cachedData[key].expires ||
    queryData.cachedData[key].expires < currentTime
  ) {
    removeCachedData(queryData, key);

    return;
  }

  return queryData.cachedData[key];
};

export const addTrackedResource = <TResource>(queryData: QueryData, key: string, resource: Resource<TResource>) => {
  if (queryData.trackedResources[key]) {
    return;
  }

  // not sure how to handle this better without casting since the collection of resource are a general pool and
  // can't be tied to a specific resource type
  queryData.trackedResources[key] = resource as Resource<CommonDataType>;
};

export const removeTrackedResource = (queryData: QueryData, key: string) => {
  delete queryData.trackedResources[key];
};

export const getTrackedResource = (queryData: QueryData, key: string) => {
  if (!queryData.trackedResources[key]) {
    return;
  }

  return queryData.trackedResources[key];
};

export type CreateTrackedQueryReturns<TResource> = [
  Resource<TResource>,
  // refetch data method
  ResourceRefetcher<TResource>,
  // mutator method
  (callback: TriggerMutateMutator<TResource>) => void,
  // returns whether the data has been initially fetched
  () => boolean,
];

export const addTrackedShouldFetch = (
  queryData: QueryData,
  key: string,
  tracker: [Accessor<boolean>, Setter<boolean>],
) => {
  if (queryData.trackedShouldFetch[key]) {
    return;
  }

  queryData.trackedShouldFetch[key] = tracker;
};

export const removeTrackedShouldFetch = (queryData: QueryData, key: string) => {
  delete queryData.trackedShouldFetch[key];
};

export const getTrackedShouldFetch = (queryData: QueryData, key: string) => {
  if (!queryData.trackedShouldFetch[key]) {
    const shouldFetchSignal = createSignal<boolean>(true);

    addTrackedShouldFetch(queryData, key, shouldFetchSignal);

    return shouldFetchSignal;
  }

  return queryData.trackedShouldFetch[key];
};

export type CreateTrackedQueryOptions = {
  cacheTime?: number;
  doInitialFetch?: boolean;
};

const createTrackedQueryOptionDefaults: CreateTrackedQueryOptions = {
  cacheTime: 0,
  doInitialFetch: true,
};

export const createTrackedQuery = <TResource>(
  queryData: QueryData,
  queryKey: () => QueryCacheKey,
  getResource: (_: boolean, info: unknown) => TResource | Promise<TResource>,
  overrideOptions: Partial<CreateTrackedQueryOptions> = {},
): CreateTrackedQueryReturns<TResource | undefined> => {
  // @todo(feature?) should we error if the passed in primary key is already being used since we really should not
  // @todo(feature?) have multiple ones active at the same time
  const [primaryKey, secondaryKey] = queryKey();
  const options = structuredClone(Object.assign({}, createTrackedQueryOptionDefaults, overrideOptions));
  const cachedData = getCachedData(queryData, primaryKey);
  // we don't use the setter as if we have cached data, we never need to do the initial request
  // const [shouldFetch, setShouldFetch] = createSignal(!cachedData?.data && options.doInitialFetch);
  const [shouldFetch, setShouldFetch] = createSignal<boolean>(!cachedData?.data && !!options.doInitialFetch);
  const resourceInfo: ResourceOptions<TResource> = {};

  if (cachedData?.data) {
    // not sure how to better handle this without the cast as the cached data is a common pool and can't be typed
    // to a specific resource data type
    resourceInfo.initialValue = cachedData.data as TResource;
  }

  const [resource, { refetch, mutate }] = createResource(shouldFetch, getResource, resourceInfo ?? {});

  const trackForCachingData = createReaction(() => {
    trackForCachingData(() => resource.state);

    if (resource.state !== ResourceState.READY) {
      return;
    }

    // not sure how to better handle this without the cast as the cached data is a common pool and can't be typed
    // to a specific resource data type
    setCachedData(queryData, queryKey, resource() as CommonDataType, options.cacheTime);
  });

  // we only want the cache data effect to run when the state changes, other changes to the resource are not important
  trackForCachingData(() => resource.state);

  // we need to set inside an onMount in order to make sure if we move to another router that has the same query
  // key, the removal of the old items and setting of the new ones are done in the proper order
  onMount(() => {
    addTrackedMutator(queryData, primaryKey, mutate as Setter<CommonDataType | undefined>);
    addTrackedRefetcher(queryData, primaryKey, refetch);
    addTrackedResource(queryData, primaryKey, resource);
    addTrackedShouldFetch(queryData, primaryKey, [shouldFetch, setShouldFetch]);

    onCleanup(() => {
      removeTrackedMutator(queryData, primaryKey);
      removeTrackedRefetcher(queryData, primaryKey);
      removeTrackedResource(queryData, primaryKey);
      removeTrackedShouldFetch(queryData, primaryKey);
    });
  });

  return [
    resource,
    async (info?: unknown) => {
      // not sure how to better handle this without the cast as the refetcher data is a common pool and can't be typed
      // to a specific resource data type
      return (await triggerRefetcher(queryData, primaryKey, {
        info,
        secondaryKey,
      })) as Promise<TResource | undefined>;
    },
    (callback: TriggerMutateMutator<TResource | undefined>) => {
      triggerMutator(queryData, queryKey, callback);
    },

    // shouldFetch determines whether the initial request for the data has happened
    () => shouldFetch(),
  ];
};

export const queryUtils = {
  createMutation,
  createTrackedQuery: <TResource>(
    queryKey: () => QueryCacheKey,
    getResource: (_: boolean, info: unknown) => TResource | Promise<TResource>,
    overrideOptions: Partial<CreateTrackedQueryOptions> = {},
  ) => createTrackedQuery(_queryData, queryKey, getResource, overrideOptions),
  triggerMutator: <TData>(queryCacheKey: () => QueryCacheKey, callback: TriggerMutateMutator<TData>) =>
    triggerMutator(_queryData, queryCacheKey, callback),
  triggerRefetcher: (key: string, options: TriggerRefetcherOptions = {}) => triggerRefetcher(_queryData, key, options),
};
