import type { Navigator } from '@solidjs/router';

import { type Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';
import { InvalidTokenError, type JwtPayload, jwtDecode } from 'jwt-decode';
import { createRoot, createSignal } from 'solid-js';

import { GlobalVariable, POST_INSTALL_REDIRECT_PARAM, applicationUtils } from '$web/utils/application';

const domain = applicationUtils.getGlobalVariable(GlobalVariable.AUTH0_DOMAIN);
const clientId = applicationUtils.getGlobalVariable(GlobalVariable.AUTH0_CLIENT_ID);
const baseUrl = applicationUtils.getGlobalVariable(GlobalVariable.AUTH0_BASE_URL);
const redirectPath = applicationUtils.getGlobalVariable(GlobalVariable.AUTH0_REDIRECT_PATH);
const logoutPath = applicationUtils.getGlobalVariable(GlobalVariable.AUTH0_LOGOUT_PATH);
const defaultPath = applicationUtils.getGlobalVariable(GlobalVariable.AUTH0_DEFAULT_PATH);
const audience = applicationUtils.getGlobalVariable(GlobalVariable.AUTH0_AUDIENCE);

const REFRESH_TOKEN_OFFSET = 45;

const notAuthenticatedErrors = ['invalid_grant', 'missing_refresh_token'];

const getTokenSilently = async (auth0Client: Auth0Client): Promise<[string | undefined, JwtPayload | undefined]> => {
  try {
    const auth0RedirectUrl = `${baseUrl}${redirectPath}`;

    const token = await auth0Client.getTokenSilently({
      authorizationParams: {
        redirect_uri: auth0RedirectUrl,
        audience,
      },
    });
    const decodedToken = jwtDecode<JwtPayload>(token);

    return [token, decodedToken];

    // biome-ignore lint/suspicious/noExplicitAny: using any seems to be the only way to deal with auth0 errors
  } catch (error: any) {
    if ((error.error && notAuthenticatedErrors.includes(error.error)) || error instanceof InvalidTokenError) {
      return [undefined, undefined];
    }

    throw error;
  }
};

const createApplicationStore = () => {
  const [auth0Client, setAuth0Client] = createSignal<Auth0Client>();
  const [isInitializing, setIsInitializing] = createSignal<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
  let refreshTokenCheckTimeoutId: number | undefined;

  const initialize = async () => {
    const newAuth0Client = await createAuth0Client({
      domain,
      clientId,
      authorizationParams: {
        redirect_uri: `${baseUrl}${redirectPath}`,
        audience,
      },

      // this seems to be needed to support certain browsers like Safari
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    });

    setAuth0Client(newAuth0Client);

    const isAuthenticated = await newAuth0Client.isAuthenticated();

    if (!isAuthenticated) {
      setIsAuthenticated(false);
      setIsInitializing(false);

      return;
    }

    const [_token_, decodedToken] = await getTokenSilently(newAuth0Client);

    if (!decodedToken || !decodedToken.exp) {
      setIsAuthenticated(false);
      setIsInitializing(false);

      return;
    }

    const user = await newAuth0Client.getUser();
    const newTokenExpiresIn = (decodedToken.exp * 1000 - Date.now()) / 1000;

    console.log('initialize');
    console.log(`new token expires in ${newTokenExpiresIn} seconds`);
    console.log('token', decodedToken);
    console.log('user', user);

    setIsAuthenticated(isAuthenticated);
    setIsInitializing(false);
    startCheckRefreshToken(newTokenExpiresIn - REFRESH_TOKEN_OFFSET);
  };

  const login = async (postLoginRedirectUrl?: string) => {
    let redirectUrl = `${baseUrl}${redirectPath}`;

    if (postLoginRedirectUrl) {
      // @todo(!!!) const for redire
      redirectUrl += `?${POST_INSTALL_REDIRECT_PARAM}=${postLoginRedirectUrl}`;
    }

    await auth0Client()?.loginWithRedirect({
      authorizationParams: {
        redirect_uri: redirectUrl,
        audience,
      },
    });
  };

  const logout = async () => {
    await auth0Client()?.logout({
      logoutParams: {
        returnTo: `${baseUrl}${logoutPath}`,
      },
    });
  };

  const handleRedirect = async (navigate?: Navigator, redirectUrl?: string | null) => {
    const currentAuth0Client = auth0Client();

    if (!currentAuth0Client) {
      await logout();

      return;
    }

    const hasState = location.search.includes('state=');
    const hasCodeOrError = location.search.includes('code=') || location.search.includes('error=');

    if (hasState && hasCodeOrError) {
      try {
        await currentAuth0Client.handleRedirectCallback();
        // biome-ignore lint/suspicious/noExplicitAny: using any seems to be the only way to deal with auth0 errors
      } catch (error: any) {
        if (error.error_description === 'Invalid state') {
          await logout();

          return;
        }

        throw error;
      }
    }

    const isAuthenticated = await currentAuth0Client.isAuthenticated();

    setIsAuthenticated(isAuthenticated);

    if (!isAuthenticated) {
      await logout();

      return;
    }

    const [_token_, decodedToken] = await getTokenSilently(currentAuth0Client);

    if (!decodedToken || !decodedToken.exp) {
      await logout();

      return;
    }

    const newTokenExpiresIn = (decodedToken.exp * 1000 - Date.now()) / 1000;

    startCheckRefreshToken(newTokenExpiresIn - REFRESH_TOKEN_OFFSET);

    navigate?.(redirectUrl || defaultPath, { replace: true });
  };

  const getAccessToken = async () => {
    const currentAuth0Client = auth0Client();

    if (!currentAuth0Client) {
      return;
    }

    const [token, decodedToken] = await getTokenSilently(currentAuth0Client);

    if (!decodedToken || !decodedToken.exp) {
      await logout();

      return;
    }

    const newTokenExpiresIn = (decodedToken.exp * 1000 - Date.now()) / 1000;

    startCheckRefreshToken(newTokenExpiresIn - REFRESH_TOKEN_OFFSET);

    return token;
  };

  const startCheckRefreshToken = (wait: number) => {
    clearTimeout(refreshTokenCheckTimeoutId);

    refreshTokenCheckTimeoutId = window.setTimeout(async () => {
      await getAccessToken();
    }, wait * 1000);
  };

  return {
    isInitializing,
    isAuthenticated,
    login,
    logout,
    initialize,
    handleRedirect,
    getAccessToken,
  };
};

const authenticationStore = createRoot(createApplicationStore);

export { authenticationStore };
