import { A, type BeforeLeaveEventArgs, useBeforeLeave, useNavigate } from '@solidjs/router';
import { type JSX, Show, Suspense, onCleanup, onMount } from 'solid-js';

import Loading from '$/components/loading';
import { type HttpRequest, httpUtils } from '$/utils/http';
import styles from '$web/components/application/application.module.css';
import { authenticationStore } from '$web/stores/authentication.store';
import { globalsStore } from '$web/stores/globals.store';
import { themeManagerStore } from '$web/stores/theme-manager.store';
import { RoutePath } from '$web/utils/application';

const ApplicationContainer = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  const navigate = useNavigate();

  useBeforeLeave((event: BeforeLeaveEventArgs) => {
    const sessionUser = authenticationStore.sessionUser();

    if (event.to === RoutePath.ONBOARDING || !sessionUser || sessionUser.hasPassword) {
      return;
    }

    event.preventDefault();
    navigate(RoutePath.ONBOARDING);
  });

  onMount(() => {
    globalsStore.initialize({
      navigate,
    });
    authenticationStore.initialize();

    const responseAuthenticationInterceptor = async (
      // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
      _requestOptions: HttpRequest<any>,
      // biome-ignore lint/suspicious/noExplicitAny: this handles generic requests so it needs to allow for any
      response: any,
      _rawResponse: Response,
    ) => {
      // @todo(!!!) logout with 401 error response
      return response;
    };

    httpUtils.addHttpResponseInterceptor(responseAuthenticationInterceptor);

    onCleanup(() => {
      httpUtils.removeHttpResponseInterceptor(responseAuthenticationInterceptor);
    });
  });

  return (
    <div data-theme={themeManagerStore.theme()} class={styles.applicationContainer}>
      <Show when={authenticationStore.isInitializing() === false} fallback={<Loading />}>
        <Show when={authenticationStore.isAuthenticated()}>
          <A href={RoutePath.HOME}>Home</A>
          <A href={RoutePath.USERS}>Users</A>
        </Show>
        <Suspense fallback={<Loading />}>{props.children}</Suspense>
      </Show>
    </div>
  );
};

export default ApplicationContainer;
