import type { FastifyInstance } from 'fastify';
import * as stytch from 'stytch';
import { applicationConfiguration } from '../load-config';

const stytchClient = new stytch.B2BClient({
  project_id: applicationConfiguration.STYTCH_PROJECT_ID,
  secret: applicationConfiguration.STYTCH_SECRET,
});

const organizationId = 'organization-test-c5d10c7f-f738-41ce-ab0c-43a6ddc19e60';

export const registerAuthenticateApi = (api: FastifyInstance) => {
  type PostLogin = {
    Body: { email: string };
  };

  api.post<PostLogin>('/auth/login', async (request, response) => {
    const email = request.body.email;

    try {
      const authResponse = await stytchClient.magicLinks.email.discovery.send({
        email_address: email,
      });

      console.log(authResponse);

      response.send(200).send({});
      // biome-ignore lint/suspicious/noExplicitAny: typescript seems to need any for errors
    } catch (error: any) {
      response.send(500).send({ error: error.toString() });
    }
  });

  type GetAuthenticate = {
    Querystring: { token: string; stytch_token_type: string };
  };

  api.get<GetAuthenticate>('/auth/authenticate', async (request, response) => {
    const token = request.query.token;
    const tokenType = request.query.stytch_token_type;

    // Handle Discovery authentication.
    if (tokenType !== 'discovery') {
      console.error(`Unrecognized token type: '${tokenType}'`);
      response.status(400).send({});
      return;
    }

    const authResp = await stytchClient.magicLinks.discovery.authenticate({
      discovery_magic_links_token: token,
    });
    if (authResp.status_code !== 200) {
      console.error('Authentication error');
      response.status(500).send({});
      return;
    }

    // Sign into existing Organization if already Member
    const ist = authResp.intermediate_session_token;

    if (authResp.discovered_organizations[0].organization?.organization_id) {
      const exchangeResp = await stytchClient.discovery.intermediateSessions.exchange({
        intermediate_session_token: ist,
        organization_id: authResp.discovered_organizations[0].organization.organization_id,
      });

      if (exchangeResp.status_code !== 200) {
        console.error(`Error exchanging IST into Organization: ${JSON.stringify(exchangeResp, null, 2)}`);
        response.status(500).send({});
        return;
      }

      // Store the returned session and return session member information
      // Using express sessions with the const key of StytchSessionToken
      request.session.stytchSessionToken = exchangeResp.session_token;

      response.status(200).send({
        message: `Hello, ${authResp.email_address}! You're logged into the ${authResp.discovered_organizations[0].organization?.organization_name} organization`,
        stytchSessionToken: request.session.stytchSessionToken,
      });

      return;
    }

    // If not eligible to log into an existing org, create new one
    const createResp = await stytchClient.discovery.organizations.create({
      intermediate_session_token: ist,
    });

    if (createResp.status_code !== 200) {
      console.error(`Error creating Organization: '${JSON.stringify(createResp, null, 2)}'`);
      response.status(500).send({});
      return;
    }
    // Store the returned session and return session member information
    // req.session.StytchSessionToken = createResp.session_token;
    request.session.stytchSessionToken = createResp.session_token;

    response.status(200).send({
      message: `Hello, ${createResp.member.email_address}! You're logged into the '${createResp.organization?.organization_name}' organization`,
      stytchSessionToken: request.session.stytchSessionToken,
    });
  });
};
