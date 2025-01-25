import { HttpMethod, httpUtils } from '$/utils/http';
import { type CreateMutationOptions, queryUtils } from '$/utils/query';
import { ApiRoute } from '$api/types/api';
import type {
  AuthenticationResetPasswordRequest,
  AuthenticationResetPasswordResponse,
} from '$api/types/authentication';
import { applicationConfiguration } from '$web/utils/application';

const mutate = async (request: AuthenticationResetPasswordRequest): Promise<AuthenticationResetPasswordResponse> => {
  return await httpUtils.http(`${applicationConfiguration.baseApiUrl}${ApiRoute.AUTHENTICATION_RESET_PASSWORD}`, {
    method: HttpMethod.POST,
    payload: request,
  });
};

export const resetPassword = (
  mutateOptions: CreateMutationOptions<AuthenticationResetPasswordRequest, AuthenticationResetPasswordResponse> = {},
) => {
  return queryUtils.createMutation(mutate, mutateOptions);
};
