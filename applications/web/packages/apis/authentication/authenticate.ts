import { HttpMethod, httpUtils } from '$/utils/http';
import { apiRoutes } from '$api/types/api';
import type { AuthenticationAuthenticateRequest, AuthenticationAuthenticateResponse } from '$api/types/authentication';
import { GlobalVariable, applicationUtils } from '$web/utils/application';

export const authenticateRaw = async (
  request: AuthenticationAuthenticateRequest,
): Promise<AuthenticationAuthenticateResponse> => {
  return await httpUtils.http(
    `${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}${apiRoutes.AUTHENTICATION_AUTHENTICATE}`,
    {
      method: HttpMethod.POST,
      payload: request,
    },
  );
};

// this method is only needed as a one-off so no need to export a query based version
