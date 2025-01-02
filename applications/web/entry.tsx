/* @refresh reload */
import '$/types/solid-js';

import '@fontsource/roboto';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'material-icons/iconfont/material-icons.css';
import '$/styles/variables.css';
import '$/styles/keyframes.css';
import '$/styles/normalize.css';
import '$/styles/base.css';
import { render } from 'solid-js/web';

import Application from '$sandbox/components/application';

const start = async () => {
  render(() => <Application.Router />, document.getElementById('application-mount') as HTMLElement);
};

start();

/* @refresh reload */
