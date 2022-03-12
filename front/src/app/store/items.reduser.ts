import { ItemsState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchItemsFailure, fetchItemsRequest, fetchItemsSuccess } from './items.actions';

const initialState: ItemsState = {
  items: [],
  fetchLoading: false,
  fetchError: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(fetchItemsRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchItemsSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchItemsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
)
