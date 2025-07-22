import {Component, Input} from '@angular/core';
import {Item} from '../../../types';
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
  @Input({ required: true })
  item!: Item
}
