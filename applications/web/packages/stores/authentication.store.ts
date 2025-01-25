import { websocketManagerStore } from '$/stores/websocket-manager.store';
import { ErrorMessage } from '$/utils/error';
import { localStorageCacheUtils } from '$/utils/local-storage-cache';
import { loggerUtils } from '$/utils/logger';
import type {
  AuthenticationAuthenticateRequest,
  AuthenticationResetPasswordRequest,
  AuthenticationSendResetPasswordRequest,
} from '$api/types/authentication';
import { authenticationApi } from '$web/apis/authentication';
import { globalsStore } from '$web/stores/globals.store';
import { LocalStorageKey, RoutePath } from '$web/utils/application';
import { createRoot, createSignal } from 'solid-js';
import type { Member as StytchMember, Organization as StytchOrganization } from 'stytch';

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

  const handleAuthenticated = (member?: StytchMember, organization?: StytchOrganization) => {
    if (member && organization) {
      localStorageCacheUtils.set<SessionUser>(LocalStorageKey.SESSION_USER, {
        id: member.member_id,
        email: member.email_address,
        name: member.name,
        organization: {
          id: organization.organization_id,
          name: organization.organization_name,
        },
      });
    }

    setIsAuthenticated(true);
    websocketManagerStore.connect();
  };

  const handleNotAuthenticated = () => {
    websocketManagerStore.disconnect();
    localStorageCacheUtils.remove(LocalStorageKey.SESSION_USER);
    setIsInitializing(false);
  };

  const initialize = async () => {
    try {
      const sessionUser = localStorageCacheUtils.get<SessionUser>(LocalStorageKey.SESSION_USER);

      if (!sessionUser) {
        handleNotAuthenticated();

        return;
      }

      await authenticationApi.checkRaw();

      handleAuthenticated();
    } catch (error: unknown) {
      // failure error is not an error, it just means we are not authenticated
      handleNotAuthenticated();
    } finally {
      setIsInitializing(false);
    }
  };

  const login = async (formData: AuthenticationAuthenticateRequest) => {
    try {
      setCurrentLoginAction(LoginAction.LOGIN);

      const authenticateResponse = await authenticationApi.authenticateRaw({
        email: formData.email,
        password: formData.password,
      });

      if (!authenticateResponse.data) {
        loggerUtils.error(ErrorMessage.UNAUTENTICATED);
        handleNotAuthenticated();

        return;
      }

      const { member, organization } = authenticateResponse.data;

      handleAuthenticated(member, organization);

      // @todo redirect to previously accessed page
      globalsStore.getNavigate()(RoutePath.HOME);
    } finally {
      setCurrentLoginAction(LoginAction.NONE);
    }
  };

  const logout = async () => {
    try {
      setCurrentLoginAction(LoginAction.LOGOUT);

      const logout = authenticationApi.logout({
        onSuccess: async () => {
          handleNotAuthenticated();

          globalsStore.getNavigate()(RoutePath.LOGIN);
        },
      });

      // this is a little weird but a logout should be a DELETE since the request is actually deleting the session
      await logout.mutate(undefined);
    } finally {
      setCurrentLoginAction(LoginAction.NONE);
    }
  };

  const sendResetPassword = async (formData: AuthenticationSendResetPasswordRequest) => {
    try {
      setCurrentLoginAction(LoginAction.RESET_PASSWORD);

      const sendResetPassword = authenticationApi.sendResetPassword({
        onSuccess: async () => {
          // @todo indicator that email should be sent if match email found
          globalsStore.getNavigate()(RoutePath.LOGIN);
        },
      });

      await sendResetPassword.mutate(formData);
    } finally {
      setCurrentLoginAction(LoginAction.NONE);
    }
  };

  const resetPassword = async (formData: AuthenticationResetPasswordRequest) => {
    try {
      const sendResetPassword = authenticationApi.resetPassword({
        onSuccess: async (mutateResponse) => {
          if (!mutateResponse.data) {
            loggerUtils.error(ErrorMessage.UNAUTENTICATED);
            handleNotAuthenticated();

            globalsStore.getNavigate()(RoutePath.LOGIN);

            return;
          }

          const { member, organization } = mutateResponse.data;

          handleAuthenticated(member, organization);

          globalsStore.getNavigate()(RoutePath.HOME);
        },
      });

      setCurrentLoginAction(LoginAction.RESET_PASSWORD);

      await sendResetPassword.mutate(formData);
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
    logout,
    initialize,
    resetPassword,
    sendResetPassword,
  };
};

const authenticationStore = createRoot(createApplicationStore);

export { authenticationStore };
