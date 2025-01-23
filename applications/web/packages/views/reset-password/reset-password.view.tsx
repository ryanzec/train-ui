import Button from '$/components/button';
import FormField from '$/components/form-field';
import FormFields from '$/components/form-fields';
import Input from '$/components/input';
import Label from '$/components/label';
import { formStoreUtils } from '$/stores/form';
import { ValidationMessageType, validationUtils } from '$/utils/validation';
import { zodUtils } from '$/utils/zod';
import { authenticationStore } from '$web/stores/authentication.store';
import { useLocation, useNavigate } from '@solidjs/router';
import type { Accessor } from 'solid-js';
import * as zod from 'zod';

export type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
  token: string;
  tokenType: string;
};

const buildResetPasswordFormSchema = (formData: Accessor<Partial<ResetPasswordFormData>>) => {
  const schema = zodUtils.schemaForType<ResetPasswordFormData>()(
    zod.object({
      password: zod
        .string()
        .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED))
        .superRefine((value: string, context: zod.RefinementCtx) => {
          if (!formData()?.confirmPassword || value === formData()?.confirmPassword) {
            return;
          }

          schema.shape.confirmPassword.safeParse(formData()?.confirmPassword);
          context.addIssue({
            code: 'custom',
            message: 'Passwords must match',
          });
        }),
      confirmPassword: zod
        .string()
        .min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED))
        .superRefine((value: string, context: zod.RefinementCtx) => {
          if (!formData()?.password || value === formData()?.password) {
            return;
          }

          schema.shape.password.safeParse(formData()?.confirmPassword);
          context.addIssue({
            code: 'custom',
            message: 'Passwords must match',
          });
        }),
      token: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
      tokenType: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    }),
  );

  return schema;
};

const ResetPasswordView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formStore = formStoreUtils.createForm<ResetPasswordFormData>({
    buildSchema: buildResetPasswordFormSchema,
    validateWith: {
      password: ['confirmPassword'],
      confirmPassword: ['password'],
    },
    initialValues: {
      token: location.query.token as string,
      tokenType: location.query.stytch_token_type as string,
    },
    onSubmit: async (data: Partial<ResetPasswordFormData>) => {
      if (!data.password || !data.confirmPassword) {
        return;
      }

      await authenticationStore.resetPassword(navigate, data as ResetPasswordFormData);
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
          <FormField errors={formStore.errors().password?.errors}>
            <Label>Password</Label>
            <Input type="text" formData={formStore.data} name="password" autofocus />
          </FormField>
          <FormField errors={formStore.errors().confirmPassword?.errors}>
            <Label>Confirm Password</Label>
            <Input type="text" formData={formStore.data} name="confirmPassword" />
          </FormField>
          <Button type="submit">Reset Password</Button>
        </FormFields>
      </form>
    </div>
  );
};

export default ResetPasswordView;
