import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { fetchItemsFailure, fetchItemsRequest, fetchItemsSuccess } from './items.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class ItemsEffects {
  constructor(private actions: Actions,
              private itemsService: ItemsService,
              private router: Router,
              private helpers: HelpersService) {
  }

  fetchItems = createEffect(() => this.actions.pipe(
    ofType(fetchItemsRequest),
    mergeMap(({category}) => this.itemsService.fetchPosts(category).pipe(
      map((items) => fetchItemsSuccess({items})),
      this.helpers.catchServerError(fetchItemsFailure),
    ))
  ));

}
