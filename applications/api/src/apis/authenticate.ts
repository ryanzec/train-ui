import { applicationConfiguration } from '$api/load-config';
import { ApiRoute } from '$api/types/api';
import type {
  AuthenticationAuthenticateRequest,
  AuthenticationAuthenticateResponse,
  AuthenticationCheckRequest,
  AuthenticationCheckResponse,
  AuthenticationLoginRequest,
  AuthenticationLoginResponse,
  AuthenticationLogoutRequest,
  AuthenticationLogoutResponse,
} from '$api/types/authentication';
import { apiUtils } from '$api/utils/api';
import type { FastifyInstance } from 'fastify';
import * as stytch from 'stytch';

const stytchClient = new stytch.B2BClient({
  project_id: applicationConfiguration.authenticationProjectId,
  secret: applicationConfiguration.authenticationSecret,
});

export const registerAuthenticateApi = (api: FastifyInstance) => {
  type PostLogin = {
    Body: AuthenticationLoginRequest;
    Reply: AuthenticationLoginResponse;
  };

  api.post<PostLogin>(ApiRoute.AUTHENTICATION_LOGIN, async (request, response) => {
    try {
      const sendEmailResponse = await stytchClient.magicLinks.email.discovery.send({
        email_address: request.body.email,
      });

      if (sendEmailResponse.status_code !== 200) {
        const errorMessage = 'error sending login email';

        api.log.error(errorMessage);

        response.status(500).send(apiUtils.respondWithError(new Error('error sending login email')));

        return;
      }

      response.status(200).send(apiUtils.respondWithData({ status: 'ok' }));
    } catch (error: unknown) {
      response.status(500).send(apiUtils.respondWithError(error));
    }
  });

  type DeleteLogout = {
    Body: AuthenticationLogoutRequest;
    Reply: AuthenticationLogoutResponse;
  };

  api.delete<DeleteLogout>(ApiRoute.AUTHENTICATION_LOGOUT, async (request, response) => {
    try {
      // @todo killing the session is fine for now but we should probably revoke the token in stytch too
      await request.session.destroy();

      response.status(200).send(apiUtils.respondWithData({ status: 'ok' }));
    } catch (error: unknown) {
      response.status(500).send(apiUtils.respondWithError(error));
    }
  });

  type PostAuthenticate = {
    Body: AuthenticationAuthenticateRequest;
    Reply: AuthenticationAuthenticateResponse;
  };

  api.post<PostAuthenticate>(ApiRoute.AUTHENTICATION_AUTHENTICATE, async (request, response) => {
    const token = request.body.token;
    const tokenType = request.body.tokenType;

    if (tokenType !== 'discovery') {
      const errorMessage = `unrecognized token type of '${tokenType}' give, only 'discovery' token is supported`;

      api.log.error(errorMessage);

      response.status(400).send(apiUtils.respondWithError(undefined, errorMessage));

      return;
    }

    const authenticationResponse = await stytchClient.magicLinks.discovery.authenticate({
      discovery_magic_links_token: token,
    });

    if (authenticationResponse.status_code !== 200) {
      const errorMessage = 'unknown authentication error';

      api.log.error(errorMessage);

      response.status(500).send(apiUtils.respondWithError(undefined, errorMessage));

      return;
    }

    const intermediateSessionToken = authenticationResponse.intermediate_session_token;
    // @todo(multi-org) handle multiple organizations instead of logging into the first one
    const organization = authenticationResponse.discovered_organizations[0].organization;

    if (!organization?.organization_id) {
      // @todo figure out organization creation
      // If not eligible to log into an existing org, create new one
      // const createResp = await stytchClient.discovery.organizations.create({
      //   intermediate_session_token: intermediateSessionToken,
      // });
      //
      // if (createResp.status_code !== 200) {
      //   api.log.error(`Error creating Organization: '${JSON.stringify(createResp, null, 2)}'`);
      //   response.status(500).send({});
      //   return;
      // }
      // // Store the returned session and return session member information
      // // req.session.StytchSessionToken = createResp.session_token;
      // request.session.stytchSessionToken = createResp.session_token;
      //
      // response.status(200).send({
      //   message: `Hello, ${createResp.member.email_address}! You're logged into the '${createResp.organization?.organization_name}' organization`,
      //   stytchSessionToken: request.session.stytchSessionToken,
      // });

      const errorMessage = 'user not part of an organization';

      api.log.error(errorMessage);

      response.status(500).send(apiUtils.respondWithError(undefined, errorMessage));

      return;
    }

    const exchangeResponse = await stytchClient.discovery.intermediateSessions.exchange({
      intermediate_session_token: intermediateSessionToken,
      organization_id: organization.organization_id,
    });
    const memberResponse = await stytchClient.organizations.members.get({
      organization_id: organization.organization_id,
      email_address: authenticationResponse.email_address,
    });

    if (exchangeResponse.status_code !== 200 || memberResponse.status_code !== 200) {
      const errorMessage =
        exchangeResponse.status_code !== 200
          ? `error exchanging intermediate token into organization: ${JSON.stringify(exchangeResponse, null, 2)}`
          : `error getting member: ${JSON.stringify(memberResponse, null, 2)}`;

      api.log.error(errorMessage);

      response.status(500).send(apiUtils.respondWithError(undefined, errorMessage));

      return;
    }

    request.session.authenticationToken = exchangeResponse.session_token;

    response.status(200).send(
      apiUtils.respondWithData({
        organization: organization,
        member: memberResponse.member,
      }),
    );
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

        response.status(500).send(apiUtils.respondWithError(new Error('error sending login email')));

        return;
      }

      response.status(200).send(apiUtils.respondWithData({ status: 'ok' }));
    } catch (error: unknown) {
      response.status(500).send(apiUtils.respondWithError(error));
    }
  });
};
