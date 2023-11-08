/* @refresh reload */
import '../../packages/types/solid-js';

import '@fontsource/roboto';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'material-icons/iconfont/material-icons.css';
import '../../packages/styles/variables-base.css';
import '../../packages/styles/variables-dark.css';
import '../../packages/styles/variables-custom.css';
import './variables.css';
import '../../packages/styles/keyframes.css';
import '../../packages/styles/normalize.css';
import { Route, Routes as SolidRoutes, Navigate, Router } from '@solidjs/router';
import { createEffect, For, Suspense } from 'solid-js';
import { render } from 'solid-js/web';

import HomeView from '$sandbox/views/home-view';

import GlobalNotificationsList from '../../packages/components/global-notifications-list';
import { globalNotificationsStore } from '../../packages/stores/global-notifications';

import ApplicationFrame from './packages/components/application-frame/application-frame';
import { applicationStore } from './packages/stores/application-store';
import { dynamicRoutesStore } from './packages/stores/dynamic-routes';

const ApplicationWrapper = () => {
  const dynamicRoutes = dynamicRoutesStore.create();

  dynamicRoutes.load();

  createEffect(() => {
    // we want to attach the theme data attribute to the body element because certain components use the Portal
    // functionality (global notifications, dialogs, etc.) to attach itself to the DOM and since theme css
    // variable are created based on this data attribute, we want to make sure those components have access to
    // those variables
    document.body.dataset.theme = applicationStore.theme();
  });

  return (
    <>
      <ApplicationFrame isLoading={dynamicRoutes.isLoading()} navigation={dynamicRoutes.navigation()}>
        <Suspense fallback="Loading...">
          <SolidRoutes>
            {/* these are the dynamic routes that are based on the files dynamically loaded with sandbox components */}
            <For each={dynamicRoutes.routes()}>
              {(route) => {
                return <Route path={route.path} component={route.component} />;
              }}
            </For>
            <Route path="/" element={<HomeView />} />
            <Route path="*" element={<Navigate href="/" />} />
          </SolidRoutes>
        </Suspense>
      </ApplicationFrame>
      <GlobalNotificationsList notifications={globalNotificationsStore.notifications()} />
    </>
  );
};

const start = async () => {
  render(
    () => (
      <Router>
        <ApplicationWrapper />
      </Router>
    ),
    document.getElementById('application-mount') as HTMLElement,
  );
};

start();
