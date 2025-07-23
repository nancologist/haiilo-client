import {Component, ElementRef, Input, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalService} from './modal.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnDestroy {
  @Input() closeOnBackdropClick: boolean = true;

  isOpen: boolean = false;
  modalData: any | null = null;
  private modalSubscription: Subscription;

  constructor(private el: ElementRef, private modalService: ModalService) {
    this.modalSubscription = this.modalService.modalState$.subscribe(state => {
      this.isOpen = state.isOpen;
      this.modalData = state.data;

      if (this.isOpen) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
    document.body.classList.remove('modal-open');
  }

  close(): void {
    this.modalService.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdropClick && event.target === this.el.nativeElement.querySelector('.modal-backdrop')) {
      this.close();
    }
  }
}
