import { authenticationStore } from '$web/stores/authentication.store';
import { useLocation } from '@solidjs/router';
import { onMount } from 'solid-js';

const AuthenticateInviteView = () => {
  const location = useLocation();

  onMount(() => {
    authenticationStore.authenticateInvite(location.query.token as string);
  });

  return <div>Authenticating...</div>;
};

export default AuthenticateInviteView;
