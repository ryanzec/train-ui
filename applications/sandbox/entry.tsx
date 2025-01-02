/* @refresh reload */
import '../../packages/types/solid-js';

import '@fontsource/open-sans';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

import 'material-icons/iconfont/material-icons.css';
import '../../packages/styles/variables.css';
import '../../packages/styles/keyframes.css';
import '../../packages/styles/normalize.css';
import '../../packages/styles/base.css';
import { render } from 'solid-js/web';

import Application from './packages/components/application';

const start = async () => {
  render(() => <Application.Router />, document.getElementById('application-mount') as HTMLElement);
};

start();
