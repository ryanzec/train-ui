import type { Navigator } from '@solidjs/router';

import { createRoot, createSignal } from 'solid-js';

import { localStorageCacheUtils } from '$/utils/local-storage-cache';
import { loggerUtils } from '$/utils/logger';
import type { AuthenticationAuthenticateRequest } from '$api/types/authentication';
import { authenticationApi } from '$web/apis/authentication';
import { LocalStorageKey, RoutePath } from '$web/utils/application';
import type { LoginFormData } from '$web/views/login/login.view';
import type { ResetPasswordFormData } from '$web/views/reset-password/reset-password';

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  organization: {
    id: string;
    name: string;
  };
};

export const LoginAction = {
  NONE: 'none',
  LOGIN: 'login',
  LOGOUT: 'logout',
  AUTHENTICATE: 'authenticate',
  RESET_PASSWORD: 'reset-password',
  SEND_RESET_PASSWORD: 'send-reset-password',
} as const;

export type LoginAction = (typeof LoginAction)[keyof typeof LoginAction];

const createApplicationStore = () => {
  const [isInitializing, setIsInitializing] = createSignal<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
  const [currentLoginAction, setCurrentLoginAction] = createSignal<LoginAction>(LoginAction.NONE);

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
        // @todo when password login flow is implemented, we should set as authenticated and redirect to home instead
        window.close();

        // the window.close() above might not work and nothing we can do about it so redirecting as a fail-safe
        navigate(RoutePath.LOGIN_COMPLETE);
      },
    });

    setCurrentLoginAction(LoginAction.LOGIN);

    await login.mutate(formData);

    setCurrentLoginAction(LoginAction.NONE);
  };

  const loginPassword = async (navigate: Navigator, formData: LoginFormData) => {
    setCurrentLoginAction(LoginAction.LOGIN);

    try {
      const authenticateResponse = await authenticationApi.authenticatePasswordRaw({
        email: formData.email,
        password: formData.password,
      });

      if (!authenticateResponse.data) {
        loggerUtils.error('error authenticating');

        return;
      }

      const { member, organization } = authenticateResponse.data;

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
    } finally {
      setCurrentLoginAction(LoginAction.NONE);
    }
  };

  const logout = async (navigate: Navigator) => {
    const logout = authenticationApi.logout({
      onSuccess: async (response) => {
        localStorageCacheUtils.remove(LocalStorageKey.SESSION_USER);
        setIsAuthenticated(false);
        navigate(RoutePath.LOGIN);
      },
    });

    setCurrentLoginAction(LoginAction.LOGOUT);

    // this is a little weird but a logout should be a DELETE since the request is actually deleting the session
    await logout.mutate(undefined);

    setCurrentLoginAction(LoginAction.NONE);
  };

  const sendResetPassword = async (navigate: Navigator, formData: LoginFormData) => {
    const sendResetPassword = authenticationApi.sendResetPassword({
      onSuccess: async () => {
        window.close();

        // the window.close() above might not work and nothing we can do about it so redirecting as a fail-safe
        navigate(RoutePath.LOGIN_COMPLETE);
      },
    });

    setCurrentLoginAction(LoginAction.RESET_PASSWORD);

    await sendResetPassword.mutate(formData);

    setCurrentLoginAction(LoginAction.NONE);
  };

  const resetPassword = async (navigate: Navigator, formData: ResetPasswordFormData) => {
    const sendResetPassword = authenticationApi.resetPassword({
      onSuccess: async () => {
        window.close();

        // the window.close() above might not work and nothing we can do about it so redirecting as a fail-safe
        navigate(RoutePath.LOGIN_COMPLETE);
      },
    });

    setCurrentLoginAction(LoginAction.RESET_PASSWORD);

    await sendResetPassword.mutate(formData);

    setCurrentLoginAction(LoginAction.NONE);
  };

  const authenticate = async (navigate: Navigator, requestInput: AuthenticationAuthenticateRequest) => {
    try {
      setCurrentLoginAction(LoginAction.AUTHENTICATE);

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
      setCurrentLoginAction(LoginAction.NONE);
    }
  };

  const isProcessingLoginAction = () => {
    return currentLoginAction() !== LoginAction.NONE;
  };

  return {
    isInitializing,
    isAuthenticated,
    currentLoginAction,
    isProcessingLoginAction,
    login,
    loginPassword,
    logout,
    initialize,
    authenticate,
    resetPassword,
    sendResetPassword,
  };
};

const authenticationStore = createRoot(createApplicationStore);

export { authenticationStore };
