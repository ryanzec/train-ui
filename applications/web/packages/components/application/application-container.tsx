import { A } from '@solidjs/router';
import { type JSX, Show, Suspense } from 'solid-js';

import Loading from '$/components/loading';
import styles from '$web/components/application/application.module.css';
import { authenticationStore } from '$web/stores/authentication.store';
import { themeManagerStore } from '$web/stores/theme-manager.store';

const ApplicationContainer = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  authenticationStore.initialize();

  return (
    <div data-theme={themeManagerStore.theme()} class={styles.applicationContainer}>
      <Show when={authenticationStore.isInitializing() === false} fallback={<Loading />}>
        <Show when={authenticationStore.isAuthenticated()}>
          <A href="/home">Home</A>
          <A href="/authentication-data">Authentication Data</A>
        </Show>
        <Suspense fallback={<Loading />}>{props.children}</Suspense>
      </Show>
    </div>
  );
};

export default ApplicationContainer;
