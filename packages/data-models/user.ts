import type { ResponseStructure } from '$/apis/utils';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type GetUsersResponse = ResponseStructure<User[]>;
export type GetUserRequest = Pick<User, 'id'>;
export type GetUserResponse = ResponseStructure<User>;
export type PostUserRequest = Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>;
export type PostUserResponse = ResponseStructure<User>;
export type PatchUserRequest = Pick<User, 'id'> & Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>>;
export type PatchUserResponse = ResponseStructure<User>;
export type DeleteUserRequest = Pick<User, 'id'>;
export type DeleteUserResponse = ResponseStructure<User>;
