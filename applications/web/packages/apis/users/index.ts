import { create } from '$web/apis/users/create';
import { getUsers } from '$web/apis/users/get-users';
import { remove } from '$web/apis/users/remove';
import { update } from '$web/apis/users/update';

export const usersApi = {
  getUsers,
  create,
  remove,
  update,
};
