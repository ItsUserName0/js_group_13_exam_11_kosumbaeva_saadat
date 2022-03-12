import { LoginError, RegisterError, User } from '../models/user.model';
import { CreateItemError, Item } from '../models/item.model';
import { Category } from '../models/category.model';

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
  item: Item | null,
  fetchItemLoading: boolean,
  fetchItemError: null | string,
  removeLoading: boolean,
  removeError: null | string,
}

export type CategoriesState = {
  categories: Category[],
  fetchLoading: boolean,
  fetchError: null | string,
}

export type AppState = {
  users: UsersState,
  items: ItemsState,
  categories: CategoriesState,
};
