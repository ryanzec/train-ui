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
import { useLocation, useNavigate } from '@solidjs/router';
import * as zod from 'zod';

export type ResetPasswordFormData = {
  email: string;
  password: string;
  token: string;
  tokenType: string;
};

export const resetPasswordFormSchema = zodUtils.schemaForType<ResetPasswordFormData>()(
  zod.object({
    email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    password: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    token: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    tokenType: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
  }),
);

const ResetPasswordView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formStore = formStoreUtils.createForm<ResetPasswordFormData, typeof resetPasswordFormSchema.shape>({
    schema: resetPasswordFormSchema,
    initialValues: {
      token: location.query.token as string,
      tokenType: location.query.stytch_token_type as string,
      email: 'test@example.com',
    },
    onSubmit: async (data: Partial<ResetPasswordFormData>) => {
      if (!data.email || !data.password) {
        return;
      }

      console.log(data);
      authenticationStore.resetPassword(navigate, data as ResetPasswordFormData);
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <div>
      <form use:formDirective>
        <FormFields>
          <FormField>
            <Input formData={formStore.data} name="token" type="hidden" />
          </FormField>
          <FormField>
            <Input formData={formStore.data} name="tokenType" type="hidden" />
          </FormField>
          <FormField errors={formStore.errors().email?.errors}>
            <Label>Email</Label>
            <Input type="text" formData={formStore.data} name="email" readonly />
          </FormField>
          <FormField errors={formStore.errors().email?.errors}>
            <Label>New Password</Label>
            <Input type="text" formData={formStore.data} name="password" autofocus />
          </FormField>
          <Button type="submit">Reset Password</Button>
        </FormFields>
      </form>
    </div>
  );
};

export default ResetPasswordView;
