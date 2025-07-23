import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  styleUrl: 'button.component.css',
  template: `
    <button class="simple-button">{{ label }}</button>
  `
})
export class ButtonComponent {
  @Input({ required: true })
  label!: string
}
