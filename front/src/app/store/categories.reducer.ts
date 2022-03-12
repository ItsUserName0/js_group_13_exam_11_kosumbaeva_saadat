import { CategoriesState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from './categories.actions';

const initialState: CategoriesState = {
  categories: [],
  fetchLoading: false,
  fetchError: null,
}

export const categoriesReducer = createReducer(
  initialState,
  on(fetchCategoriesRequest, state => ({...state, fetchLoading: true, fetchError: null})),
  on(fetchCategoriesSuccess, (state, {categories}) => ({...state, fetchLoading: false, categories})),
  on(fetchCategoriesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
);
