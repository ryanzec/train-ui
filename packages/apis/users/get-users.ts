import { User } from '$/data-models/user';
import { applicationUtils, GlobalVariable, QueryKey } from '$/utils/application';
import { HttpMethod, httpUtils } from '$/utils/http';
import { CreateTrackedQueryOptions, queryUtils } from '$/utils/query';

export interface GetUsersListReturns {
  users: User[];
}

export const getUsersRaw = async (): Promise<GetUsersListReturns> => {
  return await httpUtils.http(`${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}/users`, {
    method: HttpMethod.GET,
  });
};

export const getUsers = (queryOptions: Partial<CreateTrackedQueryOptions>) => {
  const [usersResource, refetchUsers, mutateUsers, usersInitiallyFetched] = queryUtils.createTrackedQuery(
    () => [QueryKey.GET_USERS_LIST],
    getUsersRaw,
    queryOptions,
  );
  const users = () => usersResource.latest?.users ?? [];

  return {
    users,
    usersResource,
    refetchUsers,
    mutateUsers,
    usersInitiallyFetched,
  };
};
