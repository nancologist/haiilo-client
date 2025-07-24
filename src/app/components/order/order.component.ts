import {Component} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {AsyncPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {Observable} from 'rxjs';
import {OrderItem} from '../../../types';
import {ButtonComponent} from '../UI/button/button.component';

@Component({
  selector: 'app-order',
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    ButtonComponent,
    NgStyle
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
