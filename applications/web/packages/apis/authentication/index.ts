import { authenticateRaw } from '$web/apis/authentication/authenticate';
import { checkRaw } from '$web/apis/authentication/check';
import { login } from '$web/apis/authentication/login';
import { logout } from '$web/apis/authentication/logout';

export const authenticationApi = { login, logout, authenticateRaw, checkRaw };
