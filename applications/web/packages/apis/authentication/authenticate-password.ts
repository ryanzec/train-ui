import { HttpMethod, httpUtils } from '$/utils/http';
import { ApiRoute } from '$api/types/api';
import type {
  AuthenticationAuthenticatePasswordRequest,
  AuthenticationAuthenticatePasswordResponse,
} from '$api/types/authentication';
import { GlobalVariable, applicationUtils } from '$web/utils/application';

export const authenticatePasswordRaw = async (
  request: AuthenticationAuthenticatePasswordRequest,
): Promise<AuthenticationAuthenticatePasswordResponse> => {
  return await httpUtils.http(
    `${applicationUtils.getGlobalVariable(GlobalVariable.BASE_API_URL)}${ApiRoute.AUTHENTICATION_AUTHENTICATE_PASSWORD}`,
    {
      method: HttpMethod.POST,
      payload: request,
    },
  );
};

// this method is only needed as a one-off so no need to export a query based version
