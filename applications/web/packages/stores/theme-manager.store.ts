import { createRoot, createSignal } from 'solid-js';

import { localStorageCacheUtils } from '$/utils/local-storage-cache';
import { ThemeName } from '$/utils/styles';
import { LocalStorageKey } from '$web/utils/application';

const createThemeManagerStore = () => {
  const isOSDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const overrideTheme = localStorageCacheUtils.get<ThemeName>(LocalStorageKey.UI_THEME);
  const [theme, setTheme] = createSignal<ThemeName>(overrideTheme || (isOSDarkMode ? ThemeName.DARK : ThemeName.LIGHT));

  const toggleTheme = () => {
    const newTheme = theme() === ThemeName.LIGHT ? ThemeName.DARK : ThemeName.LIGHT;

    localStorageCacheUtils.set<ThemeName>(LocalStorageKey.UI_THEME, newTheme);

    setTheme(newTheme);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

const themeManagerStore = createRoot(createThemeManagerStore);

export { themeManagerStore };
