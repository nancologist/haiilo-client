import {Component} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {ItemCardComponent} from '../item-card/item-card.component';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Item} from '../../../types';

type ItemsState = {
  items: Item[] | null
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrl: 'main.component.css',
  imports: [
    AsyncPipe,
    ItemCardComponent,
    NgForOf,
    NgIf
  ]
})
export class MainComponent {
  itemsState$: Observable<ItemsState>;

  constructor(private http: HttpClient) {
    this.itemsState$ = http.get<Item[]>("http://localhost:8080/items").pipe(
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
    )
  }
}
