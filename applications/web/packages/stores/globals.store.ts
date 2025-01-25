import type { Navigator } from '@solidjs/router';
import { createRoot } from 'solid-js';

type InitializeOptions = {
  navigate: Navigator;
};

export type GlobalsStore = {
  initialize: (options: InitializeOptions) => void;
  getNavigate: () => Navigator;
};

const createGlobalsStore = (): GlobalsStore => {
  let navigate: Navigator | undefined;

  const initialize = (options: InitializeOptions) => {
    navigate = options.navigate;
  };

  const getNavigate = () => {
    if (!navigate) {
      throw new Error('could not find navigate method which should not happen');
    }

    return navigate;
  };

  return {
    initialize,
    getNavigate,
  };
};

const globalsStore = createRoot(createGlobalsStore);

export { globalsStore };
