import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class EditItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  user: Observable<User | null>;
  userSub!: Subscription;
  token!: string | undefined;
  createLoading: Observable<boolean>;
  createError: Observable<null | CreateItemError>;
  errSub!: Subscription;

  categories: Observable<Category[]>;
  categoriesLoading: Observable<boolean>;
  categoriesError: Observable<null | string>;


  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.createLoading = store.select(state => state.items.createLoading);
    this.createError = store.select(state => state.items.createError);
    this.categories = store.select(state => state.categories.categories);
    this.categoriesLoading = store.select(state => state.categories.fetchLoading);
    this.categoriesError = store.select(state => state.categories.fetchError);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      this.token = user?.token;
    });
    this.store.dispatch(fetchCategoriesRequest());
  }

  ngAfterViewInit() {
    this.errSub = this.createError.subscribe(err => {
      if (err) {
        const msg = err.errors.image.message;
        this.form.form.get('image')?.setErrors({serverError: msg});
      } else {
        this.form.form.get('image')?.setErrors(null);
      }
    });
  }

  createPost() {
    const itemData = this.form.value;
    itemData.token = this.token;
    this.store.dispatch(createItemRequest({itemData}));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.errSub.unsubscribe();
  }

}
