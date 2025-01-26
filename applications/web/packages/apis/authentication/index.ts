import { authenticateRaw } from '$web/apis/authentication/authenticate';
import { authenticateInviteRaw } from '$web/apis/authentication/authenticate-invite';
import { checkRaw } from '$web/apis/authentication/check';
import { logout } from '$web/apis/authentication/logout';
import { resetPassword } from '$web/apis/authentication/reset-password';
import { sendResetPassword } from '$web/apis/authentication/send-reset-password';

export const authenticationApi = {
  logout,
  checkRaw,
  sendResetPassword,
  resetPassword,
  authenticateRaw,
  authenticateInviteRaw,
};
