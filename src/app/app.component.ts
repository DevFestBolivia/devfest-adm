import { Component, OnInit, ViewChild } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { ModalDirective } from './shared/directives/modal/modal.directive';

@Component({
  selector: 'wc-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @ViewChild('updateModal', { static: true })
  updateModal: ModalDirective;

  constructor(private updateService: SwUpdate) {}

  ngOnInit(): void {
    this.updateService.available.subscribe((event) => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      this.updateModal.modalInstance.open();
    });
    this.updateService.activated.subscribe((event) => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }

  updateApp(): void {
    window.location.reload();
  }
}
