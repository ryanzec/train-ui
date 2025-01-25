import Button from '$/components/button';
import FormField from '$/components/form-field';
import FormFields from '$/components/form-fields';
import Input from '$/components/input';
import Label from '$/components/label';
import { formStoreUtils } from '$/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/utils/validation';
import { zodUtils } from '$/utils/zod';
import { authenticationStore } from '$web/stores/authentication.store';
import { useNavigate } from '@solidjs/router';
import * as zod from 'zod';

export type ForgotPasswordFormData = {
  email: string;
};

export const forgotPasswordFormSchema = zodUtils.schemaForType()(
  zod.object({
    email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
  }),
);

const ForgotPasswordView = () => {
  const navigate = useNavigate();

  const formStore = formStoreUtils.createForm<ForgotPasswordFormData>({
    schema: forgotPasswordFormSchema,
    onSubmit: async (data: Partial<ForgotPasswordFormData>) => {
      if (!data.email) {
        return;
      }

      // we need to cast since the form system can't know if the data is complete or partial dynamically
      await authenticationStore.sendResetPassword(data as ForgotPasswordFormData);

      return;
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <div>
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().email?.errors}>
            <Label>Email</Label>
            <Input type="text" formData={formStore.data} name="email" autofocus />
          </FormField>
          <Button type="submit">Send Reset Password Email</Button>
        </FormFields>
      </form>
    </div>
  );
};

export default ForgotPasswordView;
