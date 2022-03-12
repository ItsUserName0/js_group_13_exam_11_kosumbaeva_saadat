import { User } from './user.model';

export interface Item {
  _id: string,
  user: User,
  title: string,
  description: string,
  image: string,
  price: string,
  category: {_id: string, category: string},
}

export interface ItemData {
  [key: string]: any,

  token: string,
  title: string,
  description: string,
  image: File,
  price: number,
  category: string,
}

export interface RemoveItemData {
  itemId: string,
  token: string,
}

export interface FieldError {
  message: string,
}

export interface CreateItemError {
  errors: {
    image: FieldError,
  },
}

