import { create } from '$/apis/users/create';
import { getUsers } from '$/apis/users/get-users';
import { remove } from '$/apis/users/remove';
import { update } from '$/apis/users/update';

export const usersApi = {
  getUsers,
  create,
  remove,
  update,
};
