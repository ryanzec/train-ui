import Button from '$/components/button';
import FormField from '$/components/form-field';
import FormFields from '$/components/form-fields';
import Input from '$/components/input';
import Label from '$/components/label';
import { formStoreUtils } from '$/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/utils/validation';
import { zodUtils } from '$/utils/zod';
import Page from '$web/components/page';
import { PageLayout } from '$web/components/page/page';
import { authenticationStore } from '$web/stores/authentication.store';
import { useLocation } from '@solidjs/router';
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
  const location = useLocation();
  const formStore = formStoreUtils.createStore<ResetPasswordFormData>({
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

      await authenticationStore.resetPassword(data as ResetPasswordFormData);
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <Page layout={PageLayout.CENTERED}>
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
    </Page>
  );
};

export default ResetPasswordView;
