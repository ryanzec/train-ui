import path from 'node:path';

import { defineConfig } from 'vite';

import { viteUtils } from '../../vite-utils';

// https://vitejs.dev/config/
export default defineConfig({
  ...viteUtils.baseConfiguration,
  root: __dirname,
  build: {
    outDir: path.join(__dirname, '..', '..', 'dist', 'web'),
    emptyOutDir: true,
  },
});
