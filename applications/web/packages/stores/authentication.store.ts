import type { Navigator } from '@solidjs/router';

import { createRoot, createSignal } from 'solid-js';

import { localStorageCacheUtils } from '$/utils/local-storage-cache';
import { loggerUtils } from '$/utils/logger';
import type { AuthenticationAuthenticateRequest } from '$api/types/authentication';
import { authenticationApi } from '$web/apis/authentication';
import { LocalStorageKey, RoutePath } from '$web/utils/application';
import type { LoginFormData } from '$web/views/login/login.view';

const createApplicationStore = () => {
  const [isInitializing, setIsInitializing] = createSignal<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
  const [isProcessingLogin, setIsProcessingLogin] = createSignal<boolean>(false);
  const [isProcessingLogout, setIsProcessingLogout] = createSignal<boolean>(false);
  const [isProcessingAuthentication, setIsProcessingAuthentication] = createSignal<boolean>(false);

  const initialize = async () => {
    try {
      const checkResponse = await authenticationApi.checkRaw();

      setIsAuthenticated(true);
    } catch (error: unknown) {
      // failure error is not an error, it just means we are not authenticated
      localStorageCacheUtils.remove(LocalStorageKey.USER_SESSION);
      setIsAuthenticated(false);
    } finally {
      setIsInitializing(false);
    }
  };

  const login = async (navigate: Navigator, formData: LoginFormData) => {
    const login = authenticationApi.login({
      onSuccess: async (response) => {
        localStorageCacheUtils.set(LocalStorageKey.USER_SESSION, { id: 'id' });
        setIsAuthenticated(true);

        // @todo when password login flow is implemented, we should redirect instead
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
        localStorageCacheUtils.remove(LocalStorageKey.USER_SESSION);
        setIsAuthenticated(false);
        navigate(RoutePath.LOGIN);
      },
    });

    setIsProcessingLogin(true);

    // this is a little weird but a logout should be a delete since the request is actually deleting the session
    await logout.mutate(undefined);

    setIsProcessingLogin(false);
  };

  const authenticate = async (navigate: Navigator, requestInput: AuthenticationAuthenticateRequest) => {
    try {
      setIsProcessingAuthentication(true);

      await authenticationApi.authenticateRaw(requestInput);

      setIsAuthenticated(true);
      navigate(RoutePath.HOME);
    } catch (error: unknown) {
      // failure error is not an error, it just means we are not authenticated
      loggerUtils.error(`error authenticating: ${error}`);
      localStorageCacheUtils.remove(LocalStorageKey.USER_SESSION);
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
