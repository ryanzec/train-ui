import { User } from '$/data-models/user';
import { HttpMethod, httpUtils } from '$/utils/http';
import { CreateMutationOptions, queryUtils } from '$/utils/query';
import { GetUsersListReturns } from '$web/apis/users/get-users';
import { applicationUtils, GlobalVariable, QueryKey } from '$web/utils/application';

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateUserReturns {
  user: User;
}

export const mutate = async (input: CreateUserParams): Promise<CreateUserReturns> => {
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

export const onSuccess = (mutationResponse: CreateUserReturns) => {
  // @todo(!!!) convert to use immer
  queryUtils.triggerMutator<GetUsersListReturns>(
    () => [QueryKey.GET_USERS_LIST],
    (oldValue) => {
      const newValue = { users: [...oldValue.users] };

      newValue.users.push(mutationResponse.user);

      return newValue;
    },
  );
};

export const create = (mutationOptions: CreateMutationOptions<CreateUserParams, CreateUserReturns>) =>
  queryUtils.createMutation(mutate, {
    ...mutationOptions,
    onSuccess: (mutationResponse) => {
      if (mutationOptions.onSuccess) {
        mutationOptions.onSuccess(mutationResponse);
      }

      onSuccess(mutationResponse);
    },
  });
