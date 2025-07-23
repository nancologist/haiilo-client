import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

interface ModalState<T> {
  isOpen: boolean;
  data: T | null;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _modalState = new BehaviorSubject<ModalState<any>>({ isOpen: false, data: null });
  public readonly modalState$: Observable<ModalState<any>> = this._modalState.asObservable();

  open(data: any = null): void {
    this._modalState.next({ isOpen: true, data: data });
  }

  close(): void {
    this._modalState.next({ isOpen: false, data: null });
  }
}
