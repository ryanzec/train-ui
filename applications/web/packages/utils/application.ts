// @todo(!!!) move to sandbox as not generic framework code
export enum QueryKey {
  GET_USERS_LIST = 'get-users-list',
}

export enum LocalStorageKey {
  USER_SESSION = 'userSession',
}

export enum GlobalVariable {
  BASE_API_URL = 'VITE_BASE_API_URL',
}

export enum RoutePath {
  LOGIN = '/login',
  HOME = '/home',
}

const getGlobalVariable = (variable: GlobalVariable) => {
  const globalVariable = import.meta.env[variable] || '';

  if (globalVariable === undefined || globalVariable === null) {
    // @todo(logging)
    console.error(`could not find global variable ${variable}`);
  }

  return globalVariable;
};

export const applicationUtils = {
  getGlobalVariable,
};
