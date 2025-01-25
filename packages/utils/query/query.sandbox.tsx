import { produce } from 'immer';
import { For, type JSX, Show, createSignal, onCleanup, onMount } from 'solid-js';

import Button from '$/components/button/button';
import Callout, { CalloutColor, CalloutVariant } from '$/components/callout';
import Input from '$/components/input';
import { HttpMethod, httpUtils } from '$/utils/http';
import {
  type CreateMutationOptions,
  type CreateTrackedQueryOptions,
  MutationState,
  queryUtils,
} from '$/utils/query/utils';
import ExpandableCode from '$sandbox/components/expandable-code';
import { applicationConfiguration } from '$web/utils/application';

export default {
  title: 'Utils/Query',
};

const SANDBOX_QUERY_GET_LIST = 'sandbox-query-get-list';

type QueryApiData = {
  id: string;
};

type GetListReturns = {
  query: Array<QueryApiData>;
};

type GetListParams = {
  filter?: string;
};

export const getList = (getParams?: () => GetListParams, queryOptions?: Partial<CreateTrackedQueryOptions>) => {
  const [resource, refetch, mutate, dataInitiallyFetched] = queryUtils.createTrackedQuery(
    () => [
      SANDBOX_QUERY_GET_LIST,
      () => {
        const params = (getParams?.() ?? { filter: '' }) as GetListParams;

        return Object.values(params);
      },
    ],
    async () => {
      let url = `${applicationConfiguration.baseApiUrl}/sandbox/query`;
      const params = (getParams?.() ?? { filter: '' }) as GetListParams;

      if (params.filter) {
        url += `?filter=${params.filter}`;
      }

      return await httpUtils.http<GetListReturns>(url, {
        method: HttpMethod.GET,
      });
    },
    queryOptions,
  );
  const data = () => resource.latest?.query ?? [];

  return {
    data,
    resource,
    refetch,
    mutate,
    dataInitiallyFetched,
  };
};

type CreateInput = {
  id: string;
};

type CreateReturns = {
  query: {
    id: string;
  };
};

export const createMutation = (options?: CreateMutationOptions<CreateInput, CreateReturns>) =>
  queryUtils.createMutation(
    async (input: CreateInput) => {
      return await httpUtils.http<CreateReturns>(`${applicationConfiguration.baseApiUrl}/sandbox/query`, {
        method: HttpMethod.POST,
        payload: input,
      });
    },
    {
      ...(options ?? {}),
      onSuccess: (mutateResponse) => {
        if (options?.onSuccess) {
          options.onSuccess(mutateResponse);
        }

        queryUtils.triggerMutator<GetListReturns>(
          () => [SANDBOX_QUERY_GET_LIST],
          (oldValue) => {
            return {
              ...oldValue,
              query: [...oldValue.query, mutateResponse.query],
            };
          },
        );
      },
    },
  );

export const createMutationOptimistic = (options?: CreateMutationOptions<CreateInput, CreateReturns>) =>
  queryUtils.createMutation(
    async (input: CreateInput) => {
      return await httpUtils.http<CreateReturns>(`${applicationConfiguration.baseApiUrl}/sandbox/query`, {
        method: HttpMethod.POST,
        payload: input,
      });
    },
    {
      ...(options ?? {}),
      onMutate: (mutateInput) => {
        if (options?.onMutate) {
          options?.onMutate(mutateInput);
        }

        queryUtils.triggerMutator<GetListReturns>(
          () => [SANDBOX_QUERY_GET_LIST],
          (oldValue) => {
            return {
              ...oldValue,
              query: [...oldValue.query, { id: mutateInput.id }],
            };
          },
        );
      },
      onError: (mutateInput, error) => {
        if (options?.onError) {
          options.onError(mutateInput, error);
        }

        queryUtils.triggerMutator<GetListReturns>(
          () => [SANDBOX_QUERY_GET_LIST],
          (oldValue) => {
            return produce(oldValue, (draft) => {
              draft.query = draft.query.filter((item) => item.id !== mutateInput.id);
            });
          },
        );
      },
    },
  );

export const GetDataWithDelay = () => {
  // @todo(!) validate works with api mock server
  // onMount(() => {
  //   // using a delay as it seems like there are times when playwright never see the loading indicator because it
  //   // goes away too quick for it to see it
  //   apiMocker.setOverrideDelay(`sandbox/query`, 2500);
  //
  //   onCleanup(() => {
  //     apiMocker.reset();
  //   });
  // });

  const { data, resource, dataInitiallyFetched } = getList();

  return (
    <div>
      <Show when={!resource.loading} fallback={<div data-id="loading-indicator">Loading...</div>}>
        <For each={data()}>
          {(item) => {
            return <div data-id="item">ID: {item.id}</div>;
          }}
        </For>
      </Show>
      <div data-id="initially-fetched-indicator">Data initially fetch: {JSON.stringify(dataInitiallyFetched())}</div>
    </div>
  );
};

export const NoInitialFetch = () => {
  const { data, resource, refetch, dataInitiallyFetched } = getList(() => ({}), { doInitialFetch: false });

  const refetchData = () => {
    refetch();
  };

  return (
    <div>
      <Show when={!resource.loading} fallback={<div data-id="loading-indicator">Loading...</div>}>
        <Button data-id="refetch-data-trigger" onClick={refetchData}>
          Refetch Data
        </Button>
        <Show when={data().length > 0} fallback="No Data">
          <For each={data()}>
            {(item) => {
              return <div data-id="item">ID: {item.id}</div>;
            }}
          </For>
        </Show>
      </Show>
      <div data-id="initially-fetched-indicator">Data initially fetch: {JSON.stringify(dataInitiallyFetched())}</div>
    </div>
  );
};

export const CachingData = () => {
  const cacheTime = 2000;
  const { data, resource, refetch, dataInitiallyFetched } = getList(() => ({}), { cacheTime: 2000 });

  const refetchData = () => {
    refetch();
  };

  return (
    <div>
      <Show when={!resource.loading} fallback={<div data-id="loading-indicator">Loading...</div>}>
        <div>
          Data is cached for {cacheTime / 1000} seconds and loading indicator should not show is loading from cache
        </div>
        <Button data-id="refetch-data-trigger" onClick={refetchData}>
          Refetch Data
        </Button>
        <Show when={data().length > 0} fallback="No Data">
          <For each={data()}>
            {(item) => {
              return <div data-id="item">ID: {item.id}</div>;
            }}
          </For>
        </Show>
      </Show>
      <div data-id="initially-fetched-indicator">Data initially fetch: {JSON.stringify(dataInitiallyFetched())}</div>
    </div>
  );
};

export const MutationManual = () => {
  const { data, resource, refetch, mutate } = getList();

  const onAddData = () => {
    mutate((oldValue) => {
      if (!oldValue) {
        return oldValue;
      }

      return {
        ...oldValue,
        query: [...oldValue.query, { id: `${oldValue.query.length + 1}` }],
      };
    });
  };

  const onRefresh = () => {
    refetch();
  };

  return (
    <div>
      <Show when={!resource.loading} fallback={<div data-id="loading-indicator">Loading...</div>}>
        <Button data-id="add-item-trigger" onClick={onAddData}>
          Add Item
        </Button>
        <div>This will refresh from the api giving the original data</div>
        <Button onClick={onRefresh}>Pull From API</Button>
        <For each={data()}>
          {(item) => {
            return <div data-id="item">ID: {item.id}</div>;
          }}
        </For>
      </Show>
    </div>
  );
};

export const DynamicQueryParameters = () => {
  const [queryParams, setQueryParams] = createSignal<GetListParams>({
    filter: '',
  });
  const { data, resource, refetch } = getList(queryParams);

  const onInput: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    setQueryParams(() => ({ filter: event.currentTarget.value }));
  };

  const onRefetch = () => {
    refetch();
  };

  return (
    <div>
      <Show when={!resource.loading} fallback={<div data-id="loading-indicator">Loading...</div>}>
        <div>Update the filter alone should not refresh the data to prevent un-needed requested</div>
        <Input
          data-id="filter-input"
          type="text"
          placeholder="Filter by..."
          onInput={onInput}
          value={queryParams().filter}
        />
        <Button data-id="refetch-data-trigger" onClick={onRefetch}>
          Pull From API
        </Button>
        <For each={data()}>
          {(item) => {
            return <div data-id="item">ID: {item.id}</div>;
          }}
        </For>
      </Show>
    </div>
  );
};

export const MutationQuery = () => {
  const [createData, setCreateData] = createSignal<CreateInput>({ id: '' });
  const { data, resource, refetch } = getList();
  const create = createMutation({
    onSuccess: () => {
      setCreateData(() => ({ id: '' }));
    },
  });

  const onInput: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    setCreateData(() => ({ id: event.currentTarget.value }));
  };

  const onCreate = () => {
    create.mutate(createData());
  };

  const onRefetch = () => {
    refetch();
  };

  const isProcessingCreate = () => create.state() === MutationState.PROCESSING;

  const lastCreateFailed = () => create.state() === MutationState.ERROR;

  return (
    <div>
      <Show when={!resource.loading} fallback={<div data-id="loading-indicator">Loading...</div>}>
        <Show when={!isProcessingCreate()} fallback={<div data-id="creating-indicator">Creating...</div>}>
          <Input
            data-id="create-input"
            type="text"
            placeholder="Created id..."
            onInput={onInput}
            value={createData().id}
          />
          <div>
            Creating should inject the new record into the cached data and update the view but not refresh the data will
            an api call
          </div>
          <Button data-id="add-item-trigger" onClick={onCreate}>
            Create
          </Button>
        </Show>
        <div>This will refresh from the api giving the original data</div>
        <Button data-id="refetch-data-trigger" onClick={onRefetch}>
          Pull From API
        </Button>
        <Show when={lastCreateFailed()}>
          <Callout data-id="create-failed-indicator" color={CalloutColor.DANGER} variant={CalloutVariant.STRONG}>
            Last create request failed
          </Callout>{' '}
        </Show>
        <For each={data()}>
          {(item) => {
            return <div data-id="item">ID: {item.id}</div>;
          }}
        </For>
      </Show>
      <h1>Debug</h1>
      <ExpandableCode label="Mutation State">
        {create.state()} || {JSON.stringify(isProcessingCreate())}
      </ExpandableCode>
      <ExpandableCode label="Create Data">{JSON.stringify(createData(), null, 2)}</ExpandableCode>
    </div>
  );
};

export const MutationQueryOptimistic = () => {
  const [createData, setCreateData] = createSignal<CreateInput>({ id: '' });
  const { data, resource, refetch } = getList();
  const create = createMutationOptimistic({
    onSuccess: () => {
      setCreateData(() => ({ id: '' }));
    },
  });

  const onInput: JSX.EventHandlerUnion<HTMLInputElement, Event> = (event) => {
    setCreateData(() => ({ id: event.currentTarget.value }));
  };

  const onCreate = () => {
    create.mutate(createData());
  };

  const onRefetch = () => {
    refetch();
  };

  const isProcessingCreate = () => create.state() === MutationState.PROCESSING;

  const lastCreateFailed = () => create.state() === MutationState.ERROR;

  return (
    <div>
      <Show when={!resource.loading} fallback={<div data-id="loading-indicator">Loading...</div>}>
        <Input
          data-id="create-input"
          type="text"
          placeholder="Created id..."
          onInput={onInput}
          value={createData().id}
        />
        <div>
          Creating should inject the new record into the cached data and update the view but not refresh the data will
          an api call
        </div>
        <Button data-id="add-item-trigger" onClick={onCreate}>
          Create
        </Button>
        <div>This will refresh from the api giving the original data</div>
        <Button data-id="refetch-data-trigger" onClick={onRefetch}>
          Pull From API
        </Button>
        <Show when={lastCreateFailed()}>
          <Callout data-id="create-failed-indicator" color={CalloutColor.DANGER} variant={CalloutVariant.STRONG}>
            Last create request failed
          </Callout>{' '}
        </Show>
        <For each={data()}>
          {(item) => {
            return (
              <div data-id="item">
                ID: {item.id} <Show when={isProcessingCreate() && item.id === createData().id}>(creating...)</Show>
              </div>
            );
          }}
        </For>
      </Show>
    </div>
  );
};
