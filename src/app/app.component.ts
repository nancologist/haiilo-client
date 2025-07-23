import {Component} from '@angular/core';
import {MainComponent} from './components/main/main.component';
import {OrderComponent} from './components/order/order.component';

@Component({
  selector: 'app-root',
  imports: [
    MainComponent,
    OrderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Supermarket';
}
