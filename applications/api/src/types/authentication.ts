import type { RequestStructure, ResponseStructure } from '$/apis/utils';
import type { Member, Organization } from 'stytch';

export type AuthenticationAuthenticateRequest = RequestStructure<{
  email: string;
  password: string;
}>;
export type AuthenticationAuthenticateResponse = ResponseStructure<{
  organization: Organization;
  member: Member;
}>;

export type AuthenticationCheckRequest = undefined;
export type AuthenticationCheckResponse = ResponseStructure<{
  status: string;
}>;

export type AuthenticationLogoutRequest = undefined;
export type AuthenticationLogoutResponse = ResponseStructure<{
  status: string;
}>;

export type AuthenticationSendResetPasswordRequest = RequestStructure<{
  email: string;
}>;
export type AuthenticationSendResetPasswordResponse = ResponseStructure<{
  status: string;
}>;

export type AuthenticationResetPasswordRequest = RequestStructure<{
  password: string;
  token: string;
  tokenType: string;
}>;
export type AuthenticationResetPasswordResponse = ResponseStructure<{
  organization: Organization;
  member: Member;
}>;
