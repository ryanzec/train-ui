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
import { type User, UserRoleName, UserRoleSource } from '$api/types/user';
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
    roles: zod.string().array().min(1, validationUtils.getMessage(ValidationMessageType.REQUIRED)),
  }),
);

export type UserFormProps = {
  editingUser?: Pick<User, 'id' | 'name' | 'email' | 'roles'>;
};

const defaultRoles = [
  {
    id: UserRoleName.STYTCH_MEMBER,
    sources: [UserRoleSource.DIRECT_ASSIGNMENT],
  },
];

const UserForm = (props: UserFormProps) => {
  const createUserMutation = usersApi.create();
  const updateUserMutation = usersApi.update();

  console.log(userUtils.rolesToStringArray(props.editingUser?.roles || defaultRoles));

  const formStore = formStoreUtils.createStore<UsersFormData>({
    schema: userFormSchema,
    onSubmit: async (data: Partial<UsersFormData>) => {
      console.log(data);
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

  createEffect(function updateWithEditingUser() {
    if (!props.editingUser) {
      untrack(() => {
        formStore.setValues(
          {
            name: props.editingUser?.name || '',
            email: props.editingUser?.email || '',
            roles: userUtils.rolesToStringArray(props.editingUser?.roles || defaultRoles),
          },
          {
            markAsTouched: false,
          },
        );
      });

      return;
    }

    untrack(() => {
      formStore.setValues({
        name: props.editingUser?.name || '',
        email: props.editingUser?.email || '',
        roles: userUtils.rolesToStringArray(props.editingUser?.roles || defaultRoles),
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
            <Button type="submit">{props.editingUser ? 'Update' : 'Invite'}</Button>
          </Button.Group>
        </FormFields>
      </form>
    </div>
  );
};

export default UserForm;
