export const ApiRoute = {
  HEALTH: '/health',
  AUTHENTICATION_LOGOUT: '/authentication/logout',
  AUTHENTICATION_AUTHENTICATE: '/authentication/authenticate',
  AUTHENTICATION_AUTHENTICATE_INVITE: '/authentication/authenticate-invite',
  AUTHENTICATION_CHECK: '/authentication/check',
  AUTHENTICATION_SEND_RESET_PASSWORD: '/authentication/send-reset-password',
  AUTHENTICATION_RESET_PASSWORD: '/authentication/reset-password',
  USERS: '/users',
} as const;

export type ApiRoute = (typeof ApiRoute)[keyof typeof ApiRoute];
