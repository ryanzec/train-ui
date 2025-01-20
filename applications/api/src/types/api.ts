export const ApiRoute = {
  HEALTH: '/health',
  AUTHENTICATION_LOGIN: '/authentication/login',
  AUTHENTICATION_LOGOUT: '/authentication/logout',
  AUTHENTICATION_AUTHENTICATE: '/authentication/authenticate',
  AUTHENTICATION_CHECK: '/authentication/check',
  USERS: '/users',
} as const;

export type ApiRoute = (typeof ApiRoute)[keyof typeof ApiRoute];
