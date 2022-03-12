import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import {
  createItemFailure,
  createItemRequest,
  createItemSuccess,
  fetchItemsFailure,
  fetchItemsRequest,
  fetchItemsSuccess
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

  createItem = createEffect(() => this.actions.pipe(
    ofType(createItemRequest),
    mergeMap(({itemData}) => this.itemsService.createItem(itemData).pipe(
      map(() => createItemSuccess()),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpers.openSnackBar('Created successful!');
      }),
      this.helpers.catchServerError(createItemFailure),
    ))
  ));

}
