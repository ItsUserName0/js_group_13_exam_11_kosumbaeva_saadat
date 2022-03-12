import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { CreateItemError } from '../../models/item.model';
import { User } from '../../models/user.model';
import { createItemRequest } from '../../store/items.actions';

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

  constructor(private store: Store<AppState>) {
    this.user = store.select(state => state.users.user);
    this.loading = store.select(state => state.items.createLoading);
    this.error = store.select(state => state.items.createError);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      this.token = user?.token;
    });
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
