import type { User, UserRole, UserRoleName, UserRoleSource } from '$api/types/user';
import type * as stytch from 'stytch';

const userRolesFromStytchMemberRoles = (roles: stytch.MemberRole[]): UserRole[] => {
  return roles.map((role) => {
    return {
      id: role.role_id,
      sources: role.sources.map((source) => {
        return source.type as UserRoleSource;
      }),
    };
  });
};

type RolesToStringArrayRoles = { id: string };

const rolesToStringArray = (roles: RolesToStringArrayRoles[]): string[] => {
  return roles.map((role) => role.id);
};

const fromStytchMember = (member: stytch.Member): User => {
  return {
    id: member.member_id,
    name: member.name,
    email: member.email_address,
    roles: userRolesFromStytchMemberRoles(member.roles),
    hasPassword: !!member.member_password_id,
    createdAt: member.created_at,
    updatedAt: member.updated_at,
  };
};

const fromStytchMembers = (members: stytch.Member[]): User[] => {
  return members.map((member) => fromStytchMember(member));
};

type ToStytchMemberUpdateDataReturn = Pick<stytch.Member, 'member_id' | 'name' | 'email_address'> & {
  roles: string[];
};

const toStytchMemberUpdateData = (user: User): ToStytchMemberUpdateDataReturn => {
  return {
    member_id: user.id,
    name: user.name,
    email_address: user.email,
    roles: rolesToStringArray(user.roles),
  };
};

const hasRole = (user: Pick<User, 'roles'>, checkRoleName: UserRoleName): boolean => {
  for (const role of user.roles) {
    if (role.id !== checkRoleName) {
      continue;
    }

    return true;
  }

  return false;
};

export const userUtils = {
  fromStytchMember,
  fromStytchMembers,
  toStytchMemberUpdateData,
  rolesToStringArray,
  hasRole,
};
