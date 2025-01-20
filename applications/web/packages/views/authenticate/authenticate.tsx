import { authenticationStore } from '$web/stores/authentication.store';
import { useLocation, useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';

const AuthenticateView = () => {
  const navigate = useNavigate();
  const locaiton = useLocation();

  onMount(() => {
    authenticationStore.authenticate(navigate, {
      token: locaiton.query.token as string,
      tokenType: locaiton.query.stytch_token_type as string,
    });
  });

  return <div>Authenticating...</div>;
};

export default AuthenticateView;
