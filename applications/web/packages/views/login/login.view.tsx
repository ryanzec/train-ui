import Button from '$/components/button';
import Checkbox from '$/components/checkbox';
import FormField from '$/components/form-field';
import FormFields from '$/components/form-fields';
import Input from '$/components/input';
import Label from '$/components/label';
import { formStoreUtils } from '$/stores/form';
import { ValidationMessageType, validationUtils } from '$/utils/validation';
import { zodUtils } from '$/utils/zod';
import { authenticationStore } from '$web/stores/authentication.store';
import { useNavigate } from '@solidjs/router';
import * as zod from 'zod';

export type LoginFormData = {
  email: string;
  resetPassword?: string[];
};

export const loginFormSchema = zodUtils.schemaForType<LoginFormData>()(
  zod.object({
    email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    resetPassword: zod.string().array().optional(),
  }),
);

const LoginView = () => {
  const navigate = useNavigate();

  const formStore = formStoreUtils.createForm<LoginFormData, typeof loginFormSchema.shape>({
    schema: loginFormSchema,
    onSubmit: async (data: Partial<LoginFormData>) => {
      if (!data.email) {
        return;
      }

      if (data.resetPassword?.length) {
        // we need to cast since the form system can't know if the data is complete or partial dynamically
        await authenticationStore.sendResetPassword(navigate, data as LoginFormData);

        return;
      }

      // we need to cast since the form system can't know if the data is complete or partial dynamically
      await authenticationStore.login(navigate, data as LoginFormData);
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
          <FormField>
            <Checkbox
              formData={formStore.data}
              name="resetPassword"
              value="true"
              labelElement="Send reset password Email"
            />
          </FormField>
          <Button type="submit">Login</Button>
        </FormFields>
      </form>
    </div>
  );
};

export default LoginView;
