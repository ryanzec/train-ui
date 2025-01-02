import { onMount } from 'solid-js';
import * as zod from 'zod';

import Checkbox from '$/components/checkbox/index';
import { formStoreUtils } from '$/stores/form';
import { zodUtils } from '$/utils/zod';

export default {
  title: 'Components/Checkbox',
};

export const Indeterminate = () => {
  let inputRef: HTMLInputElement | undefined;

  onMount(() => {
    if (!inputRef) {
      return;
    }

    inputRef.indeterminate = true;
    inputRef.dispatchEvent(new Event('change'));
  });

  return (
    <div>
      <Checkbox ref={inputRef} labelElement="Indeterminate" />
    </div>
  );
};

export const CheckedByDefault = () => {
  type FormData = {
    checkbox: string[];
  };
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

  const formDirective = formStore.formDirective;

  return (
    <form use:formDirective>
      <Checkbox
        labelElement="checkbox"
        name="checkbox"
        value="1"
        validationState={formStoreUtils.getValidationState(formStore.errors().checkbox?.errors)}
      />
    </form>
  );
};
