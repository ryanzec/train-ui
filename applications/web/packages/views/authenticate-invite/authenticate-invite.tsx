import Page from '$web/components/page';
import { PageLayout } from '$web/components/page/page';
import { authenticationStore } from '$web/stores/authentication.store';
import { useLocation } from '@solidjs/router';
import { onMount } from 'solid-js';

const AuthenticateInviteView = () => {
  const location = useLocation();

  onMount(() => {
    authenticationStore.authenticateInvite(location.query.token as string);
  });

  return <Page layout={PageLayout.CENTERED}>Authenticating...</Page>;
};

export default AuthenticateInviteView;
