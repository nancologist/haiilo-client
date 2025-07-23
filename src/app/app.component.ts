import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, of, startWith} from 'rxjs';
import {Item} from '../types';
import {AsyncPipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {ItemCardComponent} from './components/item-card/item-card.component';
import {MainComponent} from './components/main/main.component';

@Component({
  selector: 'app-root',
  imports: [
    DecimalPipe,
    NgIf,
    AsyncPipe,
    NgForOf,
    ItemCardComponent,
    MainComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Supermarket';
}
