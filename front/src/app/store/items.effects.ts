import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import {
  createItemFailure,
  createItemRequest,
  createItemSuccess, fetchItemFailure, fetchItemRequest,
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess, fetchItemSuccess, removeItemFailure, removeItemRequest, removeItemSuccess
} from './items.actions';
import { map, mergeMap, tap } from 'rxjs';

@Injectable()
export class ItemsEffects {
  constructor(private actions: Actions,
              private itemsService: ItemsService,
              private router: Router,
              private helpers: HelpersService) {
  }

  fetchItems = createEffect(() => this.actions.pipe(
    ofType(fetchItemsRequest),
    mergeMap(({category}) => this.itemsService.fetchItems(category).pipe(
      map((items) => fetchItemsSuccess({items})),
      this.helpers.catchServerError(fetchItemsFailure),
    ))
  ));

  fetchItem = createEffect(() => this.actions.pipe(
    ofType(fetchItemRequest),
    mergeMap(({id}) => this.itemsService.fetchItem(id).pipe(
      map((item) => fetchItemSuccess({item})),
      this.helpers.catchServerError(fetchItemFailure),
    ))
  ));

  createItem = createEffect(() => this.actions.pipe(
    ofType(createItemRequest),
    mergeMap(({itemData}) => this.itemsService.createItem(itemData).pipe(
      map(() => createItemSuccess()),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpers.openSnackBar('Товар успешно добавлен!');
      }),
      this.helpers.catchServerError(createItemFailure),
    ))
  ));

  removeItem = createEffect(() => this.actions.pipe(
    ofType(removeItemRequest),
    mergeMap(({data}) => this.itemsService.removeItem(data).pipe(
      map(() => removeItemSuccess()),
      tap(() => {
        this.helpers.openSnackBar('Успешно удалено!');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(removeItemFailure),
    ))
  ));

}
