import { produce } from 'immer';

import type { GetUsersResponse, PatchUserRequest, PatchUserResponse } from '$/data-models/user';
import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/utils/query';
import { GlobalVariable, QueryKey, applicationUtils } from '$web/utils/application';

export const mutate = async ({ id, ...payload }: PatchUserRequest): Promise<PatchUserResponse> => {
  if (!id) {
    throw new Error('id is required for updating a user');
  }

  return await httpUtils.http(`${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}/users/${id}`, {
    method: HttpMethod.PUT,
    payload,
  });
};

export const onSuccess = (mutationResponse: PatchUserResponse) => {
  queryUtils.triggerMutator<GetUsersResponse>(
    () => [QueryKey.GET_USERS_LIST],
    (oldValue) => {
      return produce<typeof oldValue>(oldValue, (draft) => {
        if (!mutationResponse.data) {
          // @todo(logging) should never happen but should log just in case
          return draft;
        }

        const existingIndex = draft.data?.findIndex((user) => user.id === mutationResponse.data?.id);

        if (!existingIndex || existingIndex === -1) {
          return draft;
        }

        draft.data?.splice(existingIndex, 1, mutationResponse.data);
      });
    },
  );
};

export const update = (mutationOptions: CreateMutationOptions<PatchUserRequest, PatchUserResponse>) =>
  queryUtils.createMutation(mutate, {
    ...mutationOptions,
    onSuccess: (mutationResponse) => {
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(mutationResponse);
      }

      onSuccess(mutationResponse);
    },
  });
