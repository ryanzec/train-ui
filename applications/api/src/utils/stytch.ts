import { applicationConfiguration } from '$api/utils/application-configuration';
import * as stytch from 'stytch';

export const stytchClient = new stytch.B2BClient({
  project_id: applicationConfiguration.authenticationProjectId,
  secret: applicationConfiguration.authenticationSecret,
});
