import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, startWith} from 'rxjs';
import {CheckoutPostState, ItemScanEvent, OrderItem} from '../../types';
import {HttpClient} from '@angular/common/http';
import {createErrorMessageForUser} from './utils';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderItems = new BehaviorSubject<OrderItem[]>([]);
  public readonly orderItems$ = this.orderItems.asObservable();
  public sumState$ : Observable<CheckoutPostState> = of({
    sum: undefined,
    loading: false,
    error: null
  });

  constructor(private http: HttpClient) {
  }

  addItem(event: ItemScanEvent): void {
    this.sumState$ = of({
      sum: undefined,
      loading: false,
      error: null
    });
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
    this.sumState$ = this.http.post<{ sum: number }>("http://localhost:8080/checkout", data).pipe(
      map((res) => ({ sum: res.sum, loading: false, error: null })),
      catchError(error => {
        return of({ sum: undefined, loading: false, error: createErrorMessageForUser(error) });
      }),
      startWith({ sum: undefined, loading: true, error: null })
    )
  }

  clearOrder(): void {
    this.sumState$ = of({
      sum: undefined,
      loading: false,
      error: null
    });
    this.orderItems.next([]);
  }
}
