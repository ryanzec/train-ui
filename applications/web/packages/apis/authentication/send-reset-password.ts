import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/utils/query';
import { ApiRoute } from '$api/types/api';
import type {
  AuthenticationSendResetPasswordRequest,
  AuthenticationSendResetPasswordResponse,
} from '$api/types/authentication';
import { applicationConfiguration } from '$web/utils/application';

const mutate = async (
  request: AuthenticationSendResetPasswordRequest,
): Promise<AuthenticationSendResetPasswordResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.AUTHENTICATION_SEND_RESET_PASSWORD}`, {
    method: HttpMethod.POST,
    payload: request,
  });
};

export const sendResetPassword = (
  mutateOptions: CreateMutationOptions<
    AuthenticationSendResetPasswordRequest,
    AuthenticationSendResetPasswordResponse
  > = {},
) => {
  return queryUtils.createMutation(mutate, mutateOptions);
};
