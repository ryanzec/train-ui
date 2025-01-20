export const ThemeName = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ThemeName = (typeof ThemeName)[keyof typeof ThemeName];
