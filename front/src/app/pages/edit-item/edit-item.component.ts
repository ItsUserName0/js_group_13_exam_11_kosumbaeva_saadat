import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { CreateItemError } from '../../models/item.model';
import { User } from '../../models/user.model';
import { createItemRequest } from '../../store/items.actions';
import { Category } from '../../models/category.model';
import { fetchCategoriesRequest } from '../../store/categories.actions';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.sass']
})
export class EditItemComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  user: Observable<User | null>;
  userSub!: Subscription;
  token!: string | undefined;
  loading: Observable<boolean>;
  error: Observable<null | CreateItemError>;

  categories: Observable<Category[]>;
  categLoading: Observable<boolean>;
  categError: Observable<null | string>;


  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.loading = store.select(state => state.items.createLoading);
    this.error = store.select(state => state.items.createError);
    this.categories = store.select(state => state.categories.categories);
    this.categLoading = store.select(state => state.categories.fetchLoading);
    this.categError = store.select(state => state.categories.fetchError);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      this.token = user?.token;
    });
    this.store.dispatch(fetchCategoriesRequest());
  }

  createPost() {
    const itemData = this.form.value;
    itemData.token = this.token;
    this.store.dispatch(createItemRequest({itemData}));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
