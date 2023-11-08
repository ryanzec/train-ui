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

import ApplicationWrapper from './packages/components/application-wrapper';

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

/* @refresh reload */
