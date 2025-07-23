import {Component} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {OrderItem} from '../../../types';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-order',
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    ButtonComponent
  ],
  templateUrl: 'order.component.html',
  styleUrl: 'order.component.css'
})
export class OrderComponent {
  orderItems$: Observable<OrderItem[]>;

  constructor(protected orderService: OrderService) {
    this.orderItems$ = this.orderService.orderItems$;
  }

  checkout(): void {
    this.orderService.checkout();
  }

  resetOrder(): void {
    this.orderService.clearOrder();
  }
}
