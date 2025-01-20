import type { Navigator } from '@solidjs/router';

import { createRoot, createSignal } from 'solid-js';

import { localStorageCacheUtils } from '$/utils/local-storage-cache';
import { loggerUtils } from '$/utils/logger';
import type { AuthenticationAuthenticateRequest } from '$api/types/authentication';
import { authenticationApi } from '$web/apis/authentication';
import { LocalStorageKey, RoutePath } from '$web/utils/application';
import type { LoginFormData } from '$web/views/login/login.view';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  organization: {
    id: string;
    name: string;
  };
};

const createApplicationStore = () => {
  const [isInitializing, setIsInitializing] = createSignal<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
  const [isProcessingLogin, setIsProcessingLogin] = createSignal<boolean>(false);
  const [isProcessingLogout, setIsProcessingLogout] = createSignal<boolean>(false);
  const [isProcessingAuthentication, setIsProcessingAuthentication] = createSignal<boolean>(false);

  const initialize = async () => {
    try {
      const sessionUser = localStorageCacheUtils.get<SessionUser>(LocalStorageKey.SESSION_USER);

      if (!sessionUser) {
        setIsInitializing(false);

        return;
      }

      await authenticationApi.checkRaw();

      setIsAuthenticated(true);
    } catch (error: unknown) {
      // failure error is not an error, it just means we are not authenticated
      localStorageCacheUtils.remove(LocalStorageKey.SESSION_USER);
      setIsAuthenticated(false);
    } finally {
      setIsInitializing(false);
    }
  };

  const login = async (navigate: Navigator, formData: LoginFormData) => {
    const login = authenticationApi.login({
      onSuccess: async () => {
        // @todo when password login flow is implemented, we should set and authenticated and redirect instead
        window.close();
      },
    });

    setIsProcessingLogin(true);

    await login.mutate(formData);

    setIsProcessingLogin(false);
  };

  const logout = async (navigate: Navigator) => {
    const logout = authenticationApi.logout({
      onSuccess: async (response) => {
        localStorageCacheUtils.remove(LocalStorageKey.SESSION_USER);
        setIsAuthenticated(false);
        navigate(RoutePath.LOGIN);
      },
    });

    setIsProcessingLogout(true);

    // this is a little weird but a logout should be a DELETE since the request is actually deleting the session
    await logout.mutate(undefined);

    setIsProcessingLogout(false);
  };

  const authenticate = async (navigate: Navigator, requestInput: AuthenticationAuthenticateRequest) => {
    try {
      setIsProcessingAuthentication(true);

      const authenticateResponse = await authenticationApi.authenticateRaw(requestInput);

      if (!authenticateResponse.data) {
        loggerUtils.error('error authenticating: failed to get user data');

        localStorageCacheUtils.remove(LocalStorageKey.SESSION_USER);
        setIsAuthenticated(false);

        return;
      }

      const member = authenticateResponse.data.member;
      const organization = authenticateResponse.data.organization;

      localStorageCacheUtils.set<SessionUser>(LocalStorageKey.SESSION_USER, {
        id: member.member_id,
        email: member.email_address,
        name: member.name,
        organization: {
          id: organization.organization_id,
          name: organization.organization_name,
        },
      });
      setIsAuthenticated(true);
      navigate(RoutePath.HOME);
    } catch (error: unknown) {
      // failure error is not an error, it just means we are not authenticated
      loggerUtils.error(`error authenticating: ${error}`);
      localStorageCacheUtils.remove(LocalStorageKey.SESSION_USER);
      setIsAuthenticated(false);
    } finally {
      setIsProcessingAuthentication(false);
    }
  };

  return {
    isInitializing,
    isAuthenticated,
    isProcessingLogin,
    isProcessingLogout,
    isProcessingAuthntication: isProcessingAuthentication,
    login,
    logout,
    initialize,
    authenticate,
  };
};

const authenticationStore = createRoot(createApplicationStore);

export { authenticationStore };
