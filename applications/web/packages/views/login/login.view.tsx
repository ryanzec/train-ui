import Button from '$/components/button';
import FormError from '$/components/form-error';
import FormField from '$/components/form-field';
import FormFields from '$/components/form-fields';
import Input from '$/components/input';
import Label from '$/components/label';
import { formStoreUtils } from '$/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/utils/validation';
import { zodUtils } from '$/utils/zod';
import { authenticationStore } from '$web/stores/authentication.store';
import { RoutePath } from '$web/utils/application';
import { useNavigate } from '@solidjs/router';
import { createEffect, untrack } from 'solid-js';
import * as zod from 'zod';

export type LoginFormData = {
  email: string;
  password: string;
};

export const loginFormSchema = zodUtils.schemaForType()(
  zod.object({
    email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    password: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
  }),
);

const LoginView = () => {
  const navigate = useNavigate();

  const formStore = formStoreUtils.createStore<LoginFormData>({
    // since this form is simple (and always will be) and there is a use case for clicking a button (forgot)
    // without entering anything in, no going to validate this form on change to avoid when attempting to click
    // the forgot button, the validation message causing the button location to change which would cause the
    // clicking of the forgot button to not work
    validateOnChange: false,
    schema: loginFormSchema,
    onSubmit: async (data: Partial<LoginFormData>) => {
      if (!data.email || !data.password) {
        return;
      }

      // we need to cast since the form system can't know if the data is complete or partial dynamically
      await authenticationStore.login(data as LoginFormData);
    },
  });

  const handleForgotPassword = () => {
    navigate(RoutePath.FORGOT_PASSWORD);
  };

  createEffect(function resetFormOnError() {
    if (authenticationStore.loginError().length === 0) {
      return;
    }

    untrack(() => {
      formStore.setValues({
        email: '',
        password: '',
      });
    });
  });

  const formDirective = formStore.formDirective;

  return (
    <div>
      <FormError errorMessage={authenticationStore.loginError()} />
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().email?.errors}>
            <Label>Email</Label>
            <Input type="text" formData={formStore.data} name="email" autofocus selectAllOnFocus />
          </FormField>
          <FormField errors={formStore.errors().password?.errors}>
            <Label>Password</Label>
            <Input type="text" formData={formStore.data} name="password" selectAllOnFocus />
          </FormField>
          <Button.Group>
            <Button type="submit">Login</Button>
            <Button type="button" onClick={handleForgotPassword}>
              Forgot Password
            </Button>
          </Button.Group>
        </FormFields>
      </form>
    </div>
  );
};

export default LoginView;
