// @todo(!!!) move to sandbox as not generic framework code
export const QueryKey = {
  GET_USERS_LIST: 'get-users-list',
} as const;

export type QueryKey = (typeof QueryKey)[keyof typeof QueryKey];

export const LocalStorageKey = {
  SESSION_USER: 'sessionUser',
} as const;

export type LocalStorageKey = (typeof LocalStorageKey)[keyof typeof LocalStorageKey];

export const GlobalVariable = {
  BASE_API_URL: 'VITE_BASE_API_URL',
} as const;

export type GlobalVariable = (typeof GlobalVariable)[keyof typeof GlobalVariable];

export const RoutePath = {
  LOGIN: '/login',
  HOME: '/home',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];

const getGlobalVariable = (variable: GlobalVariable) => {
  const globalVariable = import.meta.env[variable] || '';

  if (globalVariable === undefined || globalVariable === null) {
    // @todo(logging)
    console.error(`could not find global variable ${variable}`);
  }

  return globalVariable;
};

export const applicationUtils = {
  getGlobalVariable,
};
