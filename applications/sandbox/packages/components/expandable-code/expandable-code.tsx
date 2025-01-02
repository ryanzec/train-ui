import { type JSX, Show, createSignal } from 'solid-js';

import Button from '$/components/button';

type ExpandableCodeProps = JSX.ButtonHTMLAttributes<HTMLDivElement> & {
  label: string;
};

const ExpandableCode = (props: ExpandableCodeProps) => {
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
