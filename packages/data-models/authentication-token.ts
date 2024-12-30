import type { ResponseWrapper } from '$/data-models/utils';

export type AuthenticationToken = {
  token: string;
};

export type GetAuthenticateRequest = Pick<AuthenticationToken, 'token'>;
export type GetAuthenticateResponse = ResponseWrapper<AuthenticationToken>;
export type PostAuthenticateRequest = Pick<AuthenticationToken, 'token'>;
export type PostAuthenticateResponse = ResponseWrapper<AuthenticationToken>;
