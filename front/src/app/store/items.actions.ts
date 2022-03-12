import { createAction, props } from '@ngrx/store';
import { CreateItemError, Item, ItemData, RemoveItemData } from '../models/item.model';

export const fetchItemsRequest = createAction('[Items] Fetch Request', props<{ category: null | string }>());
export const fetchItemsSuccess = createAction('[Items] Fetch Success', props<{ items: Item[] }>());
export const fetchItemsFailure = createAction('[Items] Fetch Failure', props<{ error: string }>());

export const fetchItemRequest = createAction('[Item] Fetch Request', props<{ id: string }>());
export const fetchItemSuccess = createAction('[Item] Fetch Success', props<{ item: null | Item }>());
export const fetchItemFailure = createAction('[Item] Fetch Failure', props<{ error: string }>());

export const createItemRequest = createAction('[Items] Create Request', props<{ itemData: ItemData }>());
export const createItemSuccess = createAction('[Items] Create Success');
export const createItemFailure = createAction('[Items] Create Failure', props<{ error: null | CreateItemError }>());

export const removeItemRequest = createAction('[Item] Remove Request', props<{ data: RemoveItemData }>());
export const removeItemSuccess = createAction('[Item] Remove Success');
export const removeItemFailure = createAction('[Item] Remove Failure', props<{error: string}>());
