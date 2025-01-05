import type { GetUsersResponse } from '$/data-models/user';
import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateTrackedQueryOptions, queryUtils } from '$/utils/query';
import { GlobalVariable, QueryKey, applicationUtils } from '$web/utils/application';

const getUsersRaw = async (): Promise<GetUsersResponse> => {
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
  const users = () => usersResource.latest?.data || [];

  return {
    users,
    usersResource,
    refetchUsers,
    mutateUsers,
    usersInitiallyFetched,
  };
};
