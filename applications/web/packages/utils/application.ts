export const QueryKey = {
  GET_USERS_LIST: 'get-users-list',
} as const;

export type QueryKey = (typeof QueryKey)[keyof typeof QueryKey];

export const LocalStorageKey = {
  SESSION_USER: 'sessionUser',
  UI_THEME: 'uiTheme',
} as const;

export type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey];

export const RoutePath = {
  LOGIN: '/login',
  HOME: '/home',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USERS: '/users',
  ONBOARDING: '/onboarding',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];

export type ApplicationConfiguration = {
  baseApiUrl: string;
  baseWebsocketUrl: string;
};

export const applicationConfiguration: ApplicationConfiguration = {
  baseApiUrl: import.meta.env.VITE_BASE_API_URL,
  baseWebsocketUrl: import.meta.env.VITE_BASE_WEBSOCKET_URL,
};
