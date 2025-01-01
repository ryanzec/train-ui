import { type ParentProps, Show, createSignal } from 'solid-js';

import Button from '../../../../../packages/components/button/button';

type ExpandableCodeProps = {
  label: string;
};

const ExpandableCode = (props: ParentProps<ExpandableCodeProps>) => {
  const [toggle, setToggle] = createSignal(true);

  return (
    <div>
      <div>{props.label}</div>
      <Button onClick={() => setToggle(!toggle())}>Toggle</Button>
      <Show when={toggle()}>
        <pre>{props.children}</pre>
      </Show>
    </div>
  );
};

export default ExpandableCode;
