import type { ResponseStructure } from '$/apis/utils';

export type AuthenticationToken = {
  token: string;
};

export type GetAuthenticateRequest = Pick<AuthenticationToken, 'token'>;
export type GetAuthenticateResponse = ResponseStructure<AuthenticationToken>;
export type PostAuthenticateRequest = Pick<AuthenticationToken, 'token'>;
export type PostAuthenticateResponse = ResponseStructure<AuthenticationToken>;
