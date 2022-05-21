import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.model';
import { fetchItemsRequest } from '../../store/items.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass']
})
export class ItemsComponent implements OnInit {
  items: Observable<Item[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  category = 'all';

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.items = store.select(state => state.items.items);
    this.loading = store.select(state => state.items.fetchLoading);
    this.error = store.select(state => state.items.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['id'];
      this.store.dispatch(fetchItemsRequest({category: this.category ? this.category : 'all'}));
    });
  }
}
