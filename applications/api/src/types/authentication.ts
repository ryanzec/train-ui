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
