import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  fetchCategories() {
    return this.http.get<Category[]>(environment.apiUrl + '/categories');
  }

}
