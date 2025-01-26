import Button from '$/components/button';
import FormField from '$/components/form-field';
import FormFields from '$/components/form-fields';
import Input from '$/components/input';
import Label from '$/components/label';
import { formStoreUtils } from '$/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/utils/validation';
import { zodUtils } from '$/utils/zod';
import { authenticationStore } from '$web/stores/authentication.store';
import type { Accessor } from 'solid-js';
import * as zod from 'zod';

export type SetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

const buildResetPasswordFormSchema = (formData: Accessor<Partial<SetPasswordFormData>>) => {
  const schema = zodUtils.schemaForType<SetPasswordFormData>()(
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
    }),
  );

  return schema;
};

const SetPasswordForm = () => {
  const formStore = formStoreUtils.createStore<SetPasswordFormData>({
    buildSchema: buildResetPasswordFormSchema,
    validateWith: {
      password: ['confirmPassword'],
      confirmPassword: ['password'],
    },
    onSubmit: async (data: Partial<SetPasswordFormData>) => {
      if (!data.password || !data.confirmPassword) {
        return;
      }

      await authenticationStore.resetPassword(data as SetPasswordFormData);
    },
  });

  const formDirective = formStore.formDirective;

  return (
    <div>
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().password?.errors}>
            <Label>Password</Label>
            <Input type="text" formData={formStore.data} name="password" autofocus />
          </FormField>
          <FormField errors={formStore.errors().confirmPassword?.errors}>
            <Label>Confirm Password</Label>
            <Input type="text" formData={formStore.data} name="confirmPassword" />
          </FormField>
          <Button type="submit">Set Password</Button>
        </FormFields>
      </form>
    </div>
  );
};

export default SetPasswordForm;
