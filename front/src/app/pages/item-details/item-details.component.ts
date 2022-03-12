import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchItemRequest, removeItemRequest } from '../../store/items.actions';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../../models/item.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.sass']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  user: Observable<User | null>;
  userSub!: Subscription;
  userData!: User | null;
  item: Observable<null | Item>;
  itemSub!: Subscription;
  itemData!: Item | null;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  itemId = '';

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.user = store.select(state => state.users.user);
    this.item = store.select(state => state.items.item);
    this.loading = store.select(state => state.items.fetchItemLoading);
    this.error = store.select(state => state.items.fetchItemError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      this.store.dispatch(fetchItemRequest({id: this.itemId}));
    });
    this.itemSub = this.item.subscribe(item => {
      this.itemData = item;
    });
    this.userSub = this.user.subscribe(user => {
      this.userData = user;
    })
  }

  showButton() {
    return this.userData?._id === this.itemData?.user._id;
  }

  onDelete() {
    if (this.itemData?._id && this.userData?.token) {
      const data = {
        itemId: this.itemData?._id,
        token: this.userData?.token,
      };
      this.store.dispatch(removeItemRequest({data}));
    }
  }

  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
