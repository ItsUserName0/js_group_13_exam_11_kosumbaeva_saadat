import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCategoriesRequest } from '../../store/categories.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  categories: Observable<Category[]>;
  categoriesLoading: Observable<boolean>;
  categoriesError: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.categories = store.select(state => state.categories.categories);
    this.categoriesLoading = store.select(state => state.categories.fetchLoading);
    this.categoriesError = store.select(state => state.categories.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCategoriesRequest());
  }

}
