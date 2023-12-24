import * as Babel from '@babel/standalone';
// @ts-ignore
import babelPresetSolid from 'babel-preset-solid';

import Avatar from '$/components/avatar';

export default {
  title: 'Components/Playground',
};
globalThis._assert = console.assert.bind(console);

const code = ` 
globalThis._assert = console.assert.bind(console)

const TestComp = () => {
  return (
    <>
      <div>test</div>
    </>
  );
};

export default TestComp;
`;

export const Default = () => {
  const tranformed = Babel.transform(code, {
    presets: [
      [babelPresetSolid, { generate: 'dom', hydratable: false }],
      ['typescript', { onlyRemoveTypeImports: true, module: 'esnext' }],
    ],
    filename: 'index.tsx',
  });

  console.log(tranformed.code);
  eval(tranformed.code);

  return (
    <div>
      <Avatar>SJ</Avatar>
      <Avatar src="https://avatars.githubusercontent.com/u/444206?v=4">SJ</Avatar>
    </div>
  );
};
