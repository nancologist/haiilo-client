import {Component} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {OrderItem} from '../../../types';

@Component({
  selector: 'app-order',
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: 'order.component.html',
  styleUrl: 'order.component.css'
})
export class OrderComponent {
  orderItems$: Observable<OrderItem[]>

  constructor(private orderService: OrderService) {
    this.orderItems$ = this.orderService.orderItems$
  }
}
