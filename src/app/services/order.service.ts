import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import {ItemScanEvent, OrderItem} from '../../types';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderItems = new BehaviorSubject<OrderItem[]>([]);
  // private sum = new BehaviorSubject<number>(0)
  public readonly orderItems$ = this.orderItems.asObservable();
  public sum$ : Observable<number> | undefined;

  constructor(private http: HttpClient) {
  }

  addItem(event: ItemScanEvent): void {
    this.sum$ = undefined;
    const currentOrder = this.orderItems.getValue();
    const index = currentOrder.findIndex(order => order.itemId == event.itemId);
    const itemAlreadyInOrder = index > -1;

    if (itemAlreadyInOrder) {
      const updatedOrder = [...currentOrder];
      const existingOrderItem = { ...updatedOrder[index] };
      existingOrderItem.quantity += 1;
      updatedOrder[index] = existingOrderItem;
      this.orderItems.next(updatedOrder);
    } else {
      const newOrderItem: OrderItem = {
        itemId: event.itemId,
        itemName: event.itemName,
        quantity: 1
      };
      this.orderItems.next([...currentOrder, newOrderItem]);
    }
  }

  checkout() {
    const data = {
      cart: this.orderItems.getValue().map(({ itemId, quantity }) => ({ itemId, quantity }))
    }
    this.sum$ = this.http.post<{ sum: number }>("http://localhost:8080/checkout", data).pipe(
      map((res) => res.sum),
      catchError(err => {
        if (err instanceof  Error) {
          console.error(`An error occurred: ${err.message}`)
        }
        console.error("Unknown error!");
        return of()
      })
    )
  }

  clearOrder(): void {
    this.sum$ = undefined;
    this.orderItems.next([]);
  }
}
