import { onMount } from 'solid-js';
import * as zod from 'zod';

import Checkbox from '$/components/checkbox/index';
import FormField from '$/components/form-field';
import { formStoreUtils } from '$/stores/form';
import { ValidationMessageType, validationUtils } from '$/utils/validation';
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
      checkbox: zod.string().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
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
      <FormField errors={formStore.errors().checkbox?.errors}>
        <Checkbox labelElement="checkbox" name="checkbox" value="1" />
      </FormField>
    </form>
  );
};
