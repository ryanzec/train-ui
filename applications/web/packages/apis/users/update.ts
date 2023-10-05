import { produce } from 'immer';
import findIndex from 'lodash/findIndex';

import { User, UserIdentifier } from '$/data-models/user';
import { HttpMethod, httpUtils } from '$/utils/http';
import { CreateMutationOptions, queryUtils } from '$/utils/query';
import { GetUsersListReturns } from '$web/apis/users/get-users';
import { RemoveUserReturns } from '$web/apis/users/remove';
import { applicationUtils, GlobalVariable, QueryKey } from '$web/utils/application';

export interface UpdateUserParams {
  identifier: UserIdentifier;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserReturns {
  user: User;
}

export const mutate = async (input: UpdateUserParams): Promise<UpdateUserReturns> => {
  return await httpUtils.http(
    `${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}/users/${input.identifier.id}`,
    {
      method: HttpMethod.PUT,
      payload: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      },
    },
  );
};

export const onSuccess = (mutationResponse: RemoveUserReturns) => {
  // @todo(!!!) convert to use immer
  queryUtils.triggerMutator<GetUsersListReturns>(
    () => [QueryKey.GET_USERS_LIST],
    (oldValue) => {
      const newValue = { users: [...oldValue.users] };
      const matchingIndex = findIndex(newValue.users, { id: mutationResponse.user.id });

      if (matchingIndex === -1) {
        return newValue;
      }

      return produce(newValue, (draft) => {
        Object.assign(draft.users[matchingIndex], mutationResponse.user);
      });
    },
  );
};

export const update = (mutationOptions: CreateMutationOptions<UpdateUserParams, UpdateUserReturns>) =>
  queryUtils.createMutation(mutate, {
    ...mutationOptions,
    onSuccess: (mutationResponse) => {
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(mutationResponse);
      }

      onSuccess(mutationResponse);
    },
  });
