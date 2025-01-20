import Button from '$/components/button';
import FormField from '$/components/form-field';
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
};

export const loginFormSchema = zodUtils.schemaForType<LoginFormData>()(
  zod.object({
    email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
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

      // we need to cast since the form system can't know if the data is complete or partial dynamically
      await authenticationStore.login(navigate, data as LoginFormData);
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <div>
      <form use:formDirective>
        <FormField errors={formStore.errors().email?.errors}>
          <Label>Email</Label>
          <Input type="text" formData={formStore.data} name="email" autofocus />
        </FormField>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginView;
