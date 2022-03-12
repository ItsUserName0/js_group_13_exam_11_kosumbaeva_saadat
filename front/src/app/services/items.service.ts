import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Item, ItemData } from '../models/item.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {

  constructor(private http: HttpClient) {
  }

  fetchPosts(category: null | string) {
    const url = category === 'all' ? '/items' : '/items/' + category;
    return this.http.get<Item[]>(environment.apiUrl + url);
  }

  fetchPost(id: string) {
    return this.http.get<Item[] | null>(environment.apiUrl + `/items/${id}`).pipe(
      map(result => {
        if (!result) return null;
        return result[0];
      })
    )
  }

  createPost(itemData: ItemData) {
    const formData = new FormData();

    Object.keys(itemData).forEach(key => {
      if (key !== null) {
        formData.append(key, itemData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/items', formData, {headers: new HttpHeaders({'Authorization': itemData.token})});
  }
}
