import { authenticateRaw } from '$web/apis/authentication/authenticate';
import { authenticatePasswordRaw } from '$web/apis/authentication/authenticate-password';
import { checkRaw } from '$web/apis/authentication/check';
import { login } from '$web/apis/authentication/login';
import { logout } from '$web/apis/authentication/logout';
import { resetPassword } from '$web/apis/authentication/reset-password';
import { sendResetPassword } from '$web/apis/authentication/send-reset-password';

export const authenticationApi = {
  login,
  logout,
  authenticateRaw,
  checkRaw,
  sendResetPassword,
  resetPassword,
  authenticatePasswordRaw,
};
