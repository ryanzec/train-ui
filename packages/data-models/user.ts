import type { ResponseWrapper } from '$/data-models/utils';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type GetUsersResponse = ResponseWrapper<User[]>;
export type GetUserRequest = Pick<User, 'id'>;
export type GetUserResponse = ResponseWrapper<User>;
export type PostUserRequest = Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>;
export type PostUserResponse = ResponseWrapper<User>;
export type PatchUserRequest = Pick<User, 'id'> & Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>>;
export type PatchUserResponse = ResponseWrapper<User>;
export type DeleteUserRequest = Pick<User, 'id'>;
export type DeleteUserResponse = ResponseWrapper<User>;
