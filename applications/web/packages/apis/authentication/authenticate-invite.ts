import { HttpMethod, httpUtils } from '$/utils/http';
import { ApiRoute } from '$api/types/api';
import type {
  AuthenticationAuthenticateInviteRequest,
  AuthenticationAuthenticateInviteResponse,
} from '$api/types/authentication';
import { applicationConfiguration } from '$web/utils/application';

export const authenticateInviteRaw = async (
  request: AuthenticationAuthenticateInviteRequest,
): Promise<AuthenticationAuthenticateInviteResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.AUTHENTICATION_AUTHENTICATE}`, {
    method: HttpMethod.POST,
    payload: request,
  });
};

// this method is only needed as a one-off so no need to export a query based version
