import type { RequestStructure, ResponseStructure } from '$/apis/utils';

export const UserRoleName = {
  STYTCH_ADMIN: 'stytch_admin',
  STYTCH_MEMBER: 'stytch_member',
};

export type UserRoleName = (typeof UserRoleName)[keyof typeof UserRoleName];

export const userRoleNameToDisplayMap: Record<UserRoleName, string> = {
  [UserRoleName.STYTCH_ADMIN]: 'Admin',
  [UserRoleName.STYTCH_MEMBER]: 'Member',
};

// these roles are force by stytch or use and cannot be removed
export const forcedUserRoles = [UserRoleName.STYTCH_MEMBER];

export const UserRoleSource = {
  DIRECT_ASSIGNMENT: 'direct_assignment',
  EMAIL_ASSIGNMENT: 'email_assignment',
  RBAC_EMAIL_IMPLICIT_ROLE_ASSIGNMENTS: 'rbac_email_implicit_role_assignments',
  SSO_CONNECTION: 'sso_connection',
  SSO_CONNECTION_GROUP: 'sso_connection_group',
  SAML_CONNECTION_IMPLICIT_ROLE_ASSIGNMENTS: 'saml_connection_implicit_role_assignments',
  SAML_GROUP_IMPLICIT_ROLE_ASSIGNMENTS: 'saml_group_implicit_role_assignments',
  SCIM_GROUP_IMPLICIT_ROLE_ASSIGNMENTS: 'scim_group_implicit_role_assignments',
};

export type UserRoleSource = (typeof UserRoleSource)[keyof typeof UserRoleSource];

export type UserRole = {
  id: UserRoleName;
  sources: UserRoleSource[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  hasPassword: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type GetUsersResponse = ResponseStructure<User[]>;

export type GetUserRequest = RequestStructure<Pick<User, 'id'>>;
export type GetUserResponse = ResponseStructure<User>;

export type PostUserRequest = RequestStructure<
  Pick<User, 'name' | 'email'> & {
    roles: string[];
  }
>;
export type PostUserResponse = ResponseStructure<User>;

export type PatchUserRequest = RequestStructure<
  Pick<User, 'id'> &
    Partial<
      Pick<User, 'name' | 'email'> & {
        roles: string[];
      }
    >
>;
export type PatchUserResponse = ResponseStructure<User>;

export type DeleteUserRequest = RequestStructure<Pick<User, 'id'>>;
export type DeleteUserResponse = ResponseStructure<User>;
