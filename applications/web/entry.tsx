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
import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';

import { worker } from './api-mock';
import ApplicationWrapper from './packages/components/application-wrapper';

const start = async () => {
  // msw adds a bit of overhead to the initial load of the application and while for general use, that is fine
  // however since we use the sandbox for testing components with playwright, that overhead is included for every
  // test which adds up quickly. msw is not needed for all component testing so this allows us to skip that overhead
  // for those test allowing the test to run faster
  if (!location.href.includes('disable_api_mocks=true')) {
    await worker.start({
      onUnhandledRequest: ({ method, url }) => {
        // anything being served from the current host should only be coming from vite so we can ignore those
        if (url.toString().includes(location.host) || url.toString().includes(`${location.host}/packages`)) {
          return;
        }

        // make aware of apis requests that have not yet been configured
        console.warn(`Unhandled ${method} request to ${url}`);
      },
    });
  }

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

/* @refresh reload */
