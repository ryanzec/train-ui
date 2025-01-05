import type { CSSModulesOptions } from 'vite';

import path from 'node:path';
import url from 'node:url';

import solidPlugin from 'vite-plugin-solid';
import svgLoader from 'vite-svg-loader';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseConfiguration = {
  resolve: {
    alias: {
      $: path.join(__dirname, 'packages'),
      $sandbox: path.join(__dirname, 'applications', 'sandbox', 'packages'),
      $web: path.join(__dirname, 'applications', 'web', 'packages'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase' as CSSModulesOptions['localsConvention'],
    },
  },
  plugins: [svgLoader(), solidPlugin()],
};

export const viteUtils = {
  baseConfiguration,
};
