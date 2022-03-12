import { ItemsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createItemFailure,
  createItemRequest,
  createItemSuccess, fetchItemFailure, fetchItemRequest,
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess, fetchItemSuccess
} from './items.actions';

const initialState: ItemsState = {
  items: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  item: null,
  fetchItemLoading: false,
  fetchItemError: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(fetchItemsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchItemsSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchItemsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
  on(createItemRequest, state => ({...state, createLoading: false, createError: null})),
  on(createItemSuccess, state => ({...state, createLoading: false})),
  on(createItemFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),
  on(fetchItemRequest, state => ({...state, fetchItemLoading: true, fetchItemError: null})),
  on(fetchItemSuccess, (state, {item}) => ({...state, fetchItemLoading: false, item})),
  on(fetchItemFailure, (state, {error}) => ({...state, fetchItemLoading: false, fetchItemError: error})),
);
