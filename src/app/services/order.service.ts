import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ItemScanEvent, OrderItem} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderItems = new BehaviorSubject<OrderItem[]>([]);
  public readonly orderItems$ = this.orderItems.asObservable();


  addItem(event: ItemScanEvent): void {
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
}
