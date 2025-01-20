import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/utils/query';
import { ApiRoute } from '$api/types/api';
import type { AuthenticationLogoutRequest, AuthenticationLogoutResponse } from '$api/types/authentication';

import { GlobalVariable, applicationUtils } from '$web/utils/application';

const mutate = async (): Promise<AuthenticationLogoutResponse> => {
  return await httpUtils.http(
    `${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}${ApiRoute.AUTHENTICATION_LOGOUT}`,
    {
      method: HttpMethod.DELETE,
      payload: {},
    },
  );
};

export const logout = (
  mutateOptions: CreateMutationOptions<AuthenticationLogoutRequest, AuthenticationLogoutResponse> = {},
) => {
  return queryUtils.createMutation(mutate, mutateOptions);
};
