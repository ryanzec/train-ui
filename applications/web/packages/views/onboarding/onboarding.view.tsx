import Page from '$web/components/page';
import SetPasswordForm from '$web/components/set-password-form/set-password-form';
import { authenticationStore } from '$web/stores/authentication.store';
import { RoutePath } from '$web/utils/application';
import { useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';

const OnboardingView = () => {
  const navigate = useNavigate();

  onMount(() => {
    if (authenticationStore.sessionUser()?.user.hasPassword === false) {
      return;
    }

    navigate(RoutePath.HOME);
  });

  return (
    <Page>
      <Page.Header>Onboarding</Page.Header>
      <SetPasswordForm />
    </Page>
  );
};

export default OnboardingView;
