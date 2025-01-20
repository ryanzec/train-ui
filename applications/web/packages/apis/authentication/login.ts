import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/utils/query';
import { apiRoutes } from '$api/types/api';
import type { AuthenticationLoginRequest, AuthenticationLoginResponse } from '$api/types/authentication';
import { GlobalVariable, applicationUtils } from '$web/utils/application';

const mutate = async (request: AuthenticationLoginRequest): Promise<AuthenticationLoginResponse> => {
  return await httpUtils.http(
    `${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}${apiRoutes.AUTHENTICATION_LOGIN}`,
    {
      method: HttpMethod.POST,
      payload: request,
    },
  );
};

export const login = (
  mutateOptions: CreateMutationOptions<AuthenticationLoginRequest, AuthenticationLoginResponse> = {},
) => {
  return queryUtils.createMutation(mutate, mutateOptions);
};
