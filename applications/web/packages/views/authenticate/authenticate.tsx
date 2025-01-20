import { authenticationStore } from '$web/stores/authentication.store';
import { useLocation, useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';

const AuthenticateView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  onMount(() => {
    authenticationStore.authenticate(navigate, {
      token: location.query.token as string,
      tokenType: location.query.stytch_token_type as string,
    });
  });

  return <div>Authenticating...</div>;
};

export default AuthenticateView;
