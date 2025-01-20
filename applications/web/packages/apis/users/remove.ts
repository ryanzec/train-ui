import { produce } from 'immer';

import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/utils/query';
import type { DeleteUserRequest, DeleteUserResponse, GetUsersResponse } from '$api/types/users';
import { GlobalVariable, QueryKey, applicationUtils } from '$web/utils/application';

const mutate = async (request: DeleteUserRequest): Promise<DeleteUserResponse> => {
  return await httpUtils.http(
    `${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}/users/${request.id}`,
    {
      method: HttpMethod.DELETE,
    },
  );
};

const onSuccess = (mutationResponse: DeleteUserResponse) => {
  queryUtils.triggerMutator<GetUsersResponse>(
    () => [QueryKey.GET_USERS_LIST],
    (oldValue) => {
      return produce<typeof oldValue>(oldValue, (draft) => {
        if (!draft.data) {
          return draft;
        }

        const existingIndex = draft.data.findIndex((user) => user.id === mutationResponse.data?.id);

        if (!existingIndex || existingIndex === -1) {
          return draft;
        }

        draft.data.splice(existingIndex, 1);
      });
    },
  );
};

export const remove = (mutationOptions: CreateMutationOptions<DeleteUserRequest, DeleteUserResponse>) =>
  queryUtils.createMutation(mutate, {
    ...mutationOptions,
    onSuccess: (mutationResponse) => {
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(mutationResponse);
      }

      onSuccess(mutationResponse);
    },
  });
