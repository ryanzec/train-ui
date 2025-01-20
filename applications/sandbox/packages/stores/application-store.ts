import { createRoot, createSignal } from 'solid-js';

import { ThemeName } from '$/utils/styles';

const createApplicationStore = () => {
  // @todo refactor to use system theming by default
  const [theme, setTheme] = createSignal<ThemeName>(ThemeName.LIGHT);

  const toggleTheme = () => {
    setTheme(theme() === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

const applicationStore = createRoot(createApplicationStore);

export { applicationStore };
