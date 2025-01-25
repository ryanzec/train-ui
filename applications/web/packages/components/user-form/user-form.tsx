import Button from '$/components/button';
import FormError from '$/components/form-error';
import FormField from '$/components/form-field';
import FormFields from '$/components/form-fields';
import Input from '$/components/input';
import Label from '$/components/label';
import { formStoreUtils } from '$/stores/form.store';
import { ValidationMessageType, validationUtils } from '$/utils/validation';
import { zodUtils } from '$/utils/zod';
import { userUtils } from '$api/data-models/user';
import type { User } from '$api/types/user';
import { usersApi } from '$web/apis/users';
import { authenticationStore } from '$web/stores/authentication.store';
import { createEffect, untrack } from 'solid-js';
import * as zod from 'zod';

export type UsersFormData = {
  name: string;
  email: string;
  roles: string[];
};

export const userFormSchema = zodUtils.schemaForType<UsersFormData>()(
  zod.object({
    name: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    email: zod.string().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
    roles: zod.string().array().min(0, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
  }),
);

export type UserFormProps = {
  editingUser?: Pick<User, 'id' | 'name' | 'email' | 'roles'>;
};

const UserForm = (props: UserFormProps) => {
  const createUserMutation = usersApi.create();
  const updateUserMutation = usersApi.update();

  const formStore = formStoreUtils.createStore<UsersFormData>({
    schema: userFormSchema,
    initialValues: {
      name: props.editingUser?.name || '',
      email: props.editingUser?.email || '',
      roles: userUtils.rolesToStringArray(props.editingUser?.roles || []),
    },
    onSubmit: async (data: Partial<UsersFormData>) => {
      if (!data.email || !data.name || !data.roles) {
        return;
      }

      if (props.editingUser) {
        await updateUserMutation.mutate({ id: props.editingUser.id, ...(data as UsersFormData) });

        formStore.clear();

        return;
      }

      await createUserMutation.mutate(data as UsersFormData);

      formStore.clear();
    },
  });

  createEffect(function syncWithEditingUser() {
    if (!props.editingUser) {
      untrack(() => {
        formStore.clear();
      });

      return;
    }

    untrack(() => {
      formStore.setValues({
        name: props.editingUser?.name || '',
        email: props.editingUser?.email || '',
        roles: userUtils.rolesToStringArray(props.editingUser?.roles || []),
      });
    });
  });

  const formDirective = formStore.formDirective;

  return (
    <div>
      <FormError errorMessage={authenticationStore.loginError()} />
      <form use:formDirective>
        <FormFields>
          <FormField errors={formStore.errors().name?.errors}>
            <Label>Name</Label>
            <Input type="text" formData={formStore.data} name="name" autofocus />
          </FormField>
          <FormField errors={formStore.errors().email?.errors}>
            <Label>Email</Label>
            <Input type="text" formData={formStore.data} name="email" />
          </FormField>
          <Button.Group>
            <Button type="submit">Create</Button>
          </Button.Group>
        </FormFields>
      </form>
    </div>
  );
};

export default UserForm;
