import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item, ItemScanEvent} from '../../../../types';
import {DecimalPipe, NgIf} from '@angular/common';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-item-card',
  templateUrl: 'item-card.component.html',
  imports: [
    NgIf,
    DecimalPipe,
    ButtonComponent
  ],
  styleUrl: 'item-card.component.css'
})
export class ItemCardComponent {
  @Input({required: true})
  item!: Item

  @Output()
  itemScanned = new EventEmitter<ItemScanEvent>()

  @Output()
  itemEdited = new EventEmitter<Item>()

  onItemScanned() {
    this.itemScanned.emit({itemId: this.item.id, itemName: this.item.name});
  }

  edit() {
    this.itemEdited.emit({...this.item})
  }
}
