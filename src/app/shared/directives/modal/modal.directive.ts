import {
  Directive,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

import { Modal } from 'materialize-css';

@Directive({
  selector: '[wcModal]',
  exportAs: 'modalDirective',
})
export class ModalDirective implements OnInit {
  modalInstance: Modal;

  @Output() private modalClose = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.modalInstance = Modal.init(this.elementRef.nativeElement, {
      onCloseEnd: () => {
        this.modalClose.emit();
      },
    });
  }
}
