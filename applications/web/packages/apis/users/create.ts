import { produce } from 'immer';

import type { GetUsersResponse, PostUserRequest, PostUserResponse } from '$/data-models/user';
import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/utils/query';
import { GlobalVariable, QueryKey, applicationUtils } from '$web/utils/application';

export const mutate = async (input: PostUserRequest): Promise<PostUserResponse> => {
  return await httpUtils.http(`${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}/users`, {
    method: HttpMethod.POST,
    payload: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
    },
  });
};

export const onSuccess = (mutationResponse: PostUserResponse) => {
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
