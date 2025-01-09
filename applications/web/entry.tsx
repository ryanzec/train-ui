/* @refresh reload */
import '$/types/solid-js';

import '@fontsource/open-sans';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';

import '$/styles/variables.css';
import '$/styles/keyframes.css';
import '$/styles/normalize.css';
import '$/styles/base.css';
import { render } from 'solid-js/web';

import Application from '$web/components/application';

const start = async () => {
  render(() => <Application.Router />, document.getElementById('application-mount') as HTMLElement);
};

start();

/* @refresh reload */
