import {Component} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {ItemCardComponent} from '../UI/item-card/item-card.component';
import {Observable} from 'rxjs';
import {Item, ItemScanEvent, ItemsState} from '../../../types';
import {OrderService} from '../../services/order.service';
import {ModalComponent} from '../UI/modal/modal.component';
import {ModalService} from '../UI/modal/modal.service';
import {ButtonComponent} from '../UI/button/button.component';
import {FormsModule} from '@angular/forms';
import {ItemService} from '../../services/item.service';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrl: 'main.component.css',
  imports: [
    AsyncPipe,
    ItemCardComponent,
    NgForOf,
    NgIf,
    ModalComponent,
    ButtonComponent,
    FormsModule
  ]
})
export class MainComponent {
  itemsState$: Observable<ItemsState>;
  editItem: Item = {
    id: -1,
    name: '',
    price: 0,
    offer: null
  };

  constructor(
    private itemService: ItemService,
    private orderService: OrderService,
    protected modalService: ModalService
  ) {
    this.itemsState$ = this.itemService.fetchItems();
  }

  onItemScanned(event: ItemScanEvent) {
    this.orderService.addItem(event);
  }

  setEditItem(item: Item) {
    this.editItem = item;
    this.modalService.open();
  }

  updatePrice() {
    if (!this.editItem) {
      throw new Error("Item to edit is undefined.")
    }

    this.itemService.updatePrice({...this.editItem}).subscribe(() => {
      this.itemsState$ = this.itemService.fetchItems();
      this.modalService.close();
    })
  }
}
