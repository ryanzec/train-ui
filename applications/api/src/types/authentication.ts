import type { ResponseStructure } from '$/apis/utils';
import type { Member, Organization } from 'stytch';

export type AuthenticationLoginRequest = {
  email: string;
};
export type AuthenticationLoginResponse = ResponseStructure<{
  status: string;
}>;

export type AuthenticationAuthenticateRequest = {
  token: string;
  tokenType: string;
};
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

export type AuthenticationSendResetPasswordRequest = {
  email: string;
};
export type AuthenticationSendResetPasswordResponse = ResponseStructure<{
  status: string;
}>;

export type AuthenticationResetPasswordRequest = {
  email: string;
  password: string;
  token: string;
  tokenType: string;
};
export type AuthenticationResetPasswordResponse = ResponseStructure<{
  status: string;
}>;
