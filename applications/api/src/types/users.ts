import type { RequestStructure, ResponseStructure } from '$/apis/utils';
import type { User } from '$/data-models/user';

export type GetUsersResponse = ResponseStructure<User[]>;

export type GetUserRequest = RequestStructure<Pick<User, 'id'>>;
export type GetUserResponse = ResponseStructure<User>;

export type PostUserRequest = RequestStructure<Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>>;
export type PostUserResponse = ResponseStructure<User>;

export type PatchUserRequest = RequestStructure<
  Pick<User, 'id'> & Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>>
>;
export type PatchUserResponse = ResponseStructure<User>;

export type DeleteUserRequest = RequestStructure<Pick<User, 'id'>>;
export type DeleteUserResponse = ResponseStructure<User>;
