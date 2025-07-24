import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {Item, ItemsFetchState, PriceUpdateState} from '../../types';
import {HttpClient} from '@angular/common/http';
import {createErrorMessageForUser} from './utils';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  fetchItems(): Observable<ItemsFetchState> {
    return this.http.get<Item[]>("http://localhost:8080/items").pipe(
      map((items) => ({ items, loading: false, error: null })),
      catchError((error) => {
        return of({ error: createErrorMessageForUser(error), loading: false, items: null })
      }),
      startWith({ loading: true, items: null, error: null })
    );
  }

  updatePrice(item: Item): Observable<PriceUpdateState> {
    return this.http.patch<Item>(`http://localhost:8080/items/${item.id}`, { price: item.price }).pipe(
      map((_) => ({ succeeded: true, error: null })),
      catchError((error) => {
        return of({
          error: createErrorMessageForUser(error),
          succeeded: false,
        })
      })
    );
  }
}
