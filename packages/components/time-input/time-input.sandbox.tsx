import FormField from '$/components/form-field';
import TimeInput from '$/components/time-input';
import { formStoreUtils } from '$/stores/form';

export default {
  title: 'Components/TimeInput',
};

export const Default = () => {
  return (
    <>
      <FormField>
        <TimeInput />
      </FormField>
    </>
  );
};

// not exported as this is only for testing and would be caught in a `pnpm build:check`
const NameTypingTest = () => {
  const { data } = formStoreUtils.createForm<{ time: string[] }>({
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <FormField>
      {/* @ts-expect-error should error since it is not part of the form data, intended to test this functionality */}
      <TimeInput name="tim" formData={data} />
    </FormField>
  );
};
