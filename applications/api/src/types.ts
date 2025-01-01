export type AuthenticationToken = {
  authenticationToken: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Database = {
  authenticationTokens: AuthenticationToken[];
  users: User[];
};
