import { authenticationStore } from '$web/stores/authentication.store';
import { RoutePath } from '$web/utils/application';
import { useNavigate } from '@solidjs/router';
import { onMount } from 'solid-js';

const OnboardingView = () => {
  const navigate = useNavigate();

  onMount(() => {
    if (authenticationStore.sessionUser()?.hasPassword === false) {
      return;
    }

    navigate(RoutePath.HOME);
  });

  return <div>Onboarding</div>;
};

export default OnboardingView;
