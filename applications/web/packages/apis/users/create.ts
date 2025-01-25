import { produce } from 'immer';

import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/utils/query';
import type { GetUsersResponse, PostUserRequest, PostUserResponse } from '$api/types/users';
import { QueryKey, applicationConfiguration } from '$web/utils/application';

const mutate = async (request: PostUserRequest): Promise<PostUserResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}/users`, {
    method: HttpMethod.POST,
    payload: {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      password: request.password,
    },
  });
};

const onSuccess = (mutationResponse: PostUserResponse) => {
  queryUtils.triggerMutator<GetUsersResponse>(
    () => [QueryKey.GET_USERS_LIST],
    (oldValue) => {
      return produce<typeof oldValue>(oldValue, (draft) => {
        if (!mutationResponse.data) {
          return draft;
        }

        draft.data?.push(mutationResponse.data);
      });
    },
  );
};

export const create = (mutationOptions: CreateMutationOptions<PostUserRequest, PostUserResponse>) =>
  queryUtils.createMutation(mutate, {
    ...mutationOptions,
    onSuccess: (mutationResponse) => {
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(mutationResponse);
      }

      onSuccess(mutationResponse);
    },
  });
