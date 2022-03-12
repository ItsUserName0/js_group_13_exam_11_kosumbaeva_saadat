import { LoginError, RegisterError, User } from '../models/user.model';
import { CreateItemError, Item } from '../models/item.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
};

export type ItemsState = {
  items: Item[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | CreateItemError,
}

export type AppState = {
  users: UsersState,
  items: ItemsState,
};
