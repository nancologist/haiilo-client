import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {Item, ItemsState} from '../../types';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  fetchItems(): Observable<ItemsState> {
    return this.http.get<Item[]>("http://localhost:8080/items").pipe(
      map((items) => ({ items, loading: false, error: null })),
      catchError((error) => {
        let errMsg: string
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            errMsg = `Items not found (status: ${error.status})`;
          } else if (error.status >= 500) {
            errMsg = `Internal server error (status: ${error.status})`;
          } else {
            errMsg = `Uknown server error (status: ${error.status}`;
          }
        } else if (error instanceof Error) {
          errMsg = `An error occurred: ${error.message}`;
        } else {
          errMsg = "Unknown error during loading items from server"
        }

        return of({
          error: errMsg,
          loading: false,
          items: null
        })
      }),
      startWith({ loading: true, items: null, error: null })
    );
  }

  updatePrice(item: Item) {
    return this.http.patch<Item>(`http://localhost:8080/items/${item.id}`, { price: item.price }).pipe(
      map((_) => {}),
      catchError((err) => {
        if (err instanceof  Error) {
          console.error(`An error occurred: ${err.message}`)
        }
        console.error("Unknown error!");
        return of()
      })
    );
  }
}
