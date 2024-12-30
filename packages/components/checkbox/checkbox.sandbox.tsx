import { onMount } from 'solid-js';
import * as zod from 'zod';

import Checkbox from '$/components/checkbox/index';
import { formStoreUtils } from '$/stores/form';
import { zodUtils } from '$/utils/zod';

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

export const CheckedByDefault = () => {
  interface FormData {
    checkbox: string[];
  }
  const formSchema = zodUtils.schemaForType<FormData>()(
    zod.object({
      checkbox: zod.string().array().min(1, 'Required'),
    }),
  );

  const formStore = formStoreUtils.createForm<FormData, typeof formSchema.shape>({
    schema: formSchema,
    initialValues: {
      checkbox: ['1'],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const form = formStore.form;

  return (
    <form use:form>
      <Checkbox
        labelElement="checkbox"
        name="checkbox"
        value="1"
        validationState={formStoreUtils.getValidationState(formStore.errors().checkbox?.errors)}
      />
    </form>
  );
};
