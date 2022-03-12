import { createAction, props } from '@ngrx/store';
import { CreateItemError, Item, ItemData } from '../models/item.model';

export const fetchItemsRequest = createAction('[Items] Fetch Request', props<{ category: null | string }>());
export const fetchItemsSuccess = createAction('[Items] Fetch Success', props<{ items: Item[] }>());
export const fetchItemsFailure = createAction('[Items] Fetch Failure', props<{ error: null | string }>());

export const createItemRequest = createAction('[Items] Create Request', props<{ itemData: ItemData }>());
export const createItemSuccess = createAction('[Items] Create Success');
export const createItemFailure = createAction('[Items] Create Failure', props<{ error: null | CreateItemError }>());
