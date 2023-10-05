import { useNavigate } from '@solidjs/router';

import { authenticationStore } from '$web/stores/authentication.store';

const LoginRedirectView = () => {
  const navigate = useNavigate();

  authenticationStore.handleRedirect(navigate);

  return <div>Processing login...</div>;
};

export default LoginRedirectView;
