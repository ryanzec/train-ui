import { defineConfig } from 'vite';

import { viteUtils } from './vite-utils';

// https://vitejs.dev/config/
export default defineConfig({
  ...viteUtils.baseConfiguration,
  root: __dirname,

  // @ts-expect-error not sure why this causes a typescript error
  test: { include: ['packages/**/*.spec.{js,ts}', 'applications/**/*.spec.{js,ts}'] },
});
