import { onMount } from 'solid-js';

import Checkbox from '$/components/checkbox/index';

export default {
  title: 'Components/Checkbox',
};

export const Indeterminate = () => {
  let checkedInputRef: HTMLInputElement | undefined;
  let uncheckedInputRef: HTMLInputElement | undefined;

  onMount(() => {
    if (!checkedInputRef) {
      return;
    }

    checkedInputRef.indeterminate = true;
    checkedInputRef.dispatchEvent(new Event('change'));

    if (!uncheckedInputRef) {
      return;
    }

    uncheckedInputRef.indeterminate = true;
    uncheckedInputRef.dispatchEvent(new Event('change'));
  });

  return (
    <div>
      <Checkbox ref={checkedInputRef} labelElement="Indeterminate Checked" />
      <Checkbox ref={uncheckedInputRef} labelElement="Indeterminate Unchecked" />
    </div>
  );
};
