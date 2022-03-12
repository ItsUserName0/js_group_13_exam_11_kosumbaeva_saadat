import { createAction, props } from '@ngrx/store';
import { CreateItemError, Item } from '../models/item.model';

export const fetchItemsRequest = createAction('[Items] Fetch Request', props<{ category: null | string }>());
export const fetchItemsSuccess = createAction('[Items] Fetch Success', props<{ items: Item[] }>());
export const fetchItemsFailure = createAction('[Items] Fetch Failure', props<{ error: null | CreateItemError }>());
