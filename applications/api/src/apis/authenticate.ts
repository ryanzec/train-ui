import { ApiRoute } from '$api/types/api';
import type {
  AuthenticationAuthenticateInviteRequest,
  AuthenticationAuthenticateInviteResponse,
  AuthenticationAuthenticateRequest,
  AuthenticationAuthenticateResponse,
  AuthenticationCheckRequest,
  AuthenticationCheckResponse,
  AuthenticationLogoutRequest,
  AuthenticationLogoutResponse,
  AuthenticationResetPasswordRequest,
  AuthenticationResetPasswordResponse,
  AuthenticationSendResetPasswordRequest,
  AuthenticationSendResetPasswordResponse,
} from '$api/types/authentication';
import { apiUtils } from '$api/utils/api';
import { applicationConfiguration } from '$api/utils/application-configuration';
import { stytchClient } from '$api/utils/stytch';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type * as stytch from 'stytch';

type ProcessableAuthenticationResponse = {
  status_code: number;
  email_address?: string;
  member_id?: string;
  intermediate_session_token: string;
};

type ProcessAuthenticationResponseReturns = {
  member: stytch.Member;
  organization: stytch.Organization;
};

const processAuthenticationResponse = async (
  api: FastifyInstance,
  originalRequest: FastifyRequest,
  authenticationResponse: ProcessableAuthenticationResponse,
  organization: stytch.Organization,
): Promise<ProcessAuthenticationResponseReturns> => {
  if (authenticationResponse.status_code !== 200) {
    const errorMessage = 'unknown authentication error';

    api.log.error(errorMessage);

    throw new Error(errorMessage);
  }

  if (!authenticationResponse.email_address && !authenticationResponse.member_id) {
    const errorMessage = 'the response for processing authentication must include either email address or member id';

    api.log.error(errorMessage);

    throw new Error(errorMessage);
  }

  const intermediateSessionToken = authenticationResponse.intermediate_session_token;

  if (!organization.organization_id) {
    // @todo figure out organization creation
    // If not eligible to log into an existing org, create new one
    // const createResp = await stytchClient.discovery.organizations.create({
    //   intermediate_session_token: intermediateSessionToken,
    // });
    //
    // if (createResp.status_code !== 200) {
    //   logger.error(`Error creating Organization: '${JSON.stringify(createResp, null, 2)}'`);

    //   return response.status(500).send({});
    // }
    // // Store the returned session and return session member information
    // // req.session.StytchSessionToken = createResp.session_token;
    // request.session.stytchSessionToken = createResp.session_token;
    //
    // return response.status(200).send({
    //   message: `Hello, ${createResp.member.email_address}! You're logged into the '${createResp.organization?.organization_name}' organization`,
    //   stytchSessionToken: request.session.stytchSessionToken,
    // });

    const errorMessage = 'user not part of an organization';

    api.log.error(errorMessage);

    throw new Error(errorMessage);
  }

  const exchangeResponse = await stytchClient.discovery.intermediateSessions.exchange({
    intermediate_session_token: intermediateSessionToken,
    organization_id: organization.organization_id,
    session_duration_minutes: applicationConfiguration.sessionDuration,
  });
  const getMemberOption: Partial<stytch.B2BOrganizationsMembersGetRequest> = {
    organization_id: organization.organization_id,
  };

  if (authenticationResponse.email_address) {
    getMemberOption.email_address = authenticationResponse.email_address;
  } else if (authenticationResponse.member_id) {
    getMemberOption.member_id = authenticationResponse.member_id;
  }

  const memberResponse = await stytchClient.organizations.members.get(
    getMemberOption as stytch.B2BOrganizationsMembersGetRequest,
  );

  if (exchangeResponse.status_code !== 200 || memberResponse.status_code !== 200) {
    const errorMessage =
      exchangeResponse.status_code !== 200
        ? `error exchanging intermediate token into organization: ${JSON.stringify(exchangeResponse, null, 2)}`
        : `error getting member: ${JSON.stringify(memberResponse, null, 2)}`;

    api.log.error(errorMessage);

    throw new Error(errorMessage);
  }

  originalRequest.session.authenticationToken = exchangeResponse.session_token;
  originalRequest.session.organizationId = organization.organization_id;
  originalRequest.session.userId = memberResponse.member.member_id;

  return {
    member: memberResponse.member,
    organization: exchangeResponse.organization,
  };
};

export const registerAuthenticateApi = (api: FastifyInstance) => {
  type DeleteLogout = {
    Body: AuthenticationLogoutRequest;
    Reply: AuthenticationLogoutResponse;
  };

  api.delete<DeleteLogout>(ApiRoute.AUTHENTICATION_LOGOUT, async (request, response) => {
    try {
      // @todo killing the session is fine for now but we should probably revoke the token in stytch too
      await request.session.destroy();

      return response.status(200).send(apiUtils.respondWithData({ status: 'ok' }));
    } catch (error: unknown) {
      return response.status(500).send(apiUtils.respondWithError(error));
    }
  });

  type PostSendResetPassword = {
    Body: AuthenticationSendResetPasswordRequest;
    Reply: AuthenticationSendResetPasswordResponse;
  };

  api.post<PostSendResetPassword>(ApiRoute.AUTHENTICATION_SEND_RESET_PASSWORD, async (request, response) => {
    try {
      const sendEmailResponse = await stytchClient.passwords.discovery.email.resetStart({
        email_address: request.body.email,
      });

      if (sendEmailResponse.status_code !== 200) {
        const errorMessage = 'error sending reset password email';

        api.log.error(errorMessage);

        return response.status(500).send(apiUtils.respondWithError(new Error(errorMessage)));
      }

      return response.status(200).send(apiUtils.respondWithData({ status: 'ok' }));
    } catch (error: unknown) {
      return response.status(500).send(apiUtils.respondWithError(error));
    }
  });

  type PostResetPassword = {
    Body: AuthenticationResetPasswordRequest;
    Reply: AuthenticationResetPasswordResponse;
  };

  api.post<PostResetPassword>(ApiRoute.AUTHENTICATION_RESET_PASSWORD, async (request, response) => {
    try {
      const token = request.body.token;
      const tokenType = request.body.tokenType;
      const password = request.body.password;

      if (tokenType !== 'discovery') {
        const errorMessage = `unrecognized token type of '${tokenType}' give, only 'discovery' token is supported`;

        api.log.error(errorMessage);

        return response.status(400).send(apiUtils.respondWithError(undefined, errorMessage));
      }

      const resetPasswordResponse = await stytchClient.passwords.discovery.email.reset({
        password_reset_token: token,
        password,
      });

      const organization = resetPasswordResponse.discovered_organizations[0].organization;

      if (!organization) {
        const errorMessage = 'unable to get organization to login to';

        api.log.error(errorMessage);

        return response.status(400).send(apiUtils.respondWithError(undefined, errorMessage));
      }

      const responseData = await processAuthenticationResponse(api, request, resetPasswordResponse, organization);

      return response.status(200).send(apiUtils.respondWithData(responseData));
    } catch (error: unknown) {
      return response.status(500).send(apiUtils.respondWithError(error));
    }
  });

  type PostAuthenticate = {
    Body: AuthenticationAuthenticateRequest;
    Reply: AuthenticationAuthenticateResponse;
  };

  api.post<PostAuthenticate>(ApiRoute.AUTHENTICATION_AUTHENTICATE, async (request, response) => {
    try {
      const email = request.body.email;
      const password = request.body.password;

      const authenticationResponse = await stytchClient.passwords.discovery.authenticate({
        email_address: email,
        password,
      });

      const organization = authenticationResponse.discovered_organizations[0].organization;

      if (!organization) {
        const errorMessage = 'unable to get organization to login to';

        api.log.error(errorMessage);

        return response.status(400).send(apiUtils.respondWithError(undefined, errorMessage));
      }

      const responseData = await processAuthenticationResponse(api, request, authenticationResponse, organization);

      return response.status(200).send(apiUtils.respondWithData(responseData));
    } catch (error: unknown) {
      return response.status(500).send(apiUtils.respondWithError(error));
    }
  });

  type PostAuthenticateInvite = {
    Body: AuthenticationAuthenticateInviteRequest;
    Reply: AuthenticationAuthenticateInviteResponse;
  };

  api.post<PostAuthenticateInvite>(ApiRoute.AUTHENTICATION_AUTHENTICATE_INVITE, async (request, response) => {
    try {
      const inviteAuthenticationResponse = await stytchClient.magicLinks.authenticate({
        magic_links_token: request.body.token,
      });
      const organization = inviteAuthenticationResponse.organization;

      if (!organization) {
        const errorMessage = 'unable to get organization to login to';

        api.log.error(errorMessage);

        return response.status(400).send(apiUtils.respondWithError(undefined, errorMessage));
      }

      const responseData = await processAuthenticationResponse(
        api,
        request,
        inviteAuthenticationResponse,
        organization,
      );

      return response.status(200).send(apiUtils.respondWithData(responseData));
    } catch (error: unknown) {
      return response.status(500).send(apiUtils.respondWithError(error));
    }
  });

  type GetCheck = {
    Body: AuthenticationCheckRequest;
    Reply: AuthenticationCheckResponse;
  };

  api.get<GetCheck>(ApiRoute.AUTHENTICATION_CHECK, async (request, response) => {
    try {
      const authenticateResponse = await stytchClient.sessions.authenticate({
        session_token: request.session.authenticationToken,
      });

      if (authenticateResponse.status_code !== 200) {
        const errorMessage = 'error validation current authentication token';

        api.log.error(errorMessage);

        return response.status(500).send(apiUtils.respondWithError(new Error('error sending login email')));
      }

      return response.status(200).send(apiUtils.respondWithData({ status: 'ok' }));
    } catch (error: unknown) {
      return response.status(500).send(apiUtils.respondWithError(error));
    }
  });
};
