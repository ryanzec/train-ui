// @todo(!!!) move to sandbox as not generic framework code
export enum QueryKey {
  GET_USERS_LIST = 'get-users-list',
}

export const POST_INSTALL_REDIRECT_PARAM = 'redirectUrl';

export enum GlobalVariable {
  BASE_API_URL = 'VITE_BASE_API_URL',
  AUTH0_DOMAIN = 'VITE_AUTH0_DOMAIN',
  AUTH0_CLIENT_ID = 'VITE_AUTH0_CLIENT_ID',
  AUTH0_BASE_URL = 'VITE_AUTH0_BASE_URL',
  AUTH0_REDIRECT_PATH = 'VITE_AUTH0_REDIRECT_PATH',
  AUTH0_LOGOUT_PATH = 'VITE_AUTH0_LOGOUT_PATH',
  AUTH0_DEFAULT_PATH = 'VITE_AUTH0_DEFAULT_PATH',
  AUTH0_AUDIENCE = 'VITE_AUTH0_AUDIENCE',
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
