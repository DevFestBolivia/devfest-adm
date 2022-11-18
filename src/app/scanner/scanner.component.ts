import { Component, OnDestroy, ViewChild } from '@angular/core';

import { Subscription, timer } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthService } from '../core/services/auth/auth.service';
import { PostulantsService } from '../core/services/postulants.service';
import { Postulant } from '../core/models/postulant.model';
import { ModalDirective } from '../shared/directives/modal/modal.directive';
import { Ticket } from '../core/models/ticket.enum';
import {
  registrationFields,
  workshops,
} from '../core/models/registration.const';

const defaultRate = 3;

@Component({
  selector: 'wc-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnDestroy {
  currentUser$ = this.auth.getCurrentUser();
  modalMessage: string;
  postulant: Postulant;
  postulantId: string;
  postulantPoints = defaultRate;
  registrationFields = registrationFields;
  selectedItemForScan: string;
  workshops = workshops;

  Ticket = Ticket;

  @ViewChild('postulantProcessedModal', { static: true })
  private postulantModal: ModalDirective;

  private postulantSubscription: Subscription;

  constructor(
    public postulantsService: PostulantsService,
    private auth: AuthService,
  ) {}

  ngOnDestroy(): void {
    this.postulantSubscription?.unsubscribe();
  }

  processQRCode(postulantId: string): void {
    if (!this.postulantId && postulantId) {
      this.postulantId = encodeURIComponent(postulantId);

      if (this.postulantSubscription) {
        this.postulantSubscription.unsubscribe();
      }

      this.postulantSubscription = this.postulantsService
        .getById(this.postulantId)
        .pipe(first())
        .subscribe((postulant) => {
          if (postulant) {
            this.modalMessage = 'La lectura del credencial fue exitosa';
            this.postulant = postulant;
          } else {
            this.modalMessage = 'Esto no parece un credencial válido';
          }

          timer(100).subscribe(() => this.postulantModal.modalInstance.open());
        });
    }
  }

  cleanData(): void {
    this.postulantId = '';
    this.postulant = null;
    this.postulantSubscription?.unsubscribe();
  }
}
