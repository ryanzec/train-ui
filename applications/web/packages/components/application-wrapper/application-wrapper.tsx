import { Show, Suspense } from 'solid-js';

import Loading from '$/components/loading';
import styles from '$web/components/application-wrapper/application-wrapper.module.css';
import Routes from '$web/components/routing';
import { authenticationStore } from '$web/stores/authentication.store';
import { themeManagerStore } from '$web/stores/theme-manager.store';

const ApplicationWrapper = () => {
  authenticationStore.initialize();

  return (
    <div data-theme={themeManagerStore.theme()} class={styles.applicationWrapper}>
      <Show when={authenticationStore.isInitializing() === false} fallback={<Loading />}>
        <Show when={authenticationStore.isAuthenticated()}>
          <a href="/home">Home</a>
          <a href="/authentication-data">Authentication Data</a>
        </Show>
        <Suspense fallback={<Loading />}>
          <Routes />
        </Suspense>
      </Show>
    </div>
  );
};

export default ApplicationWrapper;
