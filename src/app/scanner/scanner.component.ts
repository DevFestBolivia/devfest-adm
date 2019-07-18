import { Component, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { PostulantsService } from '../shared/services/postulants.service';
import { Postulant } from '../shared/models/postulant.model';
import { ModalDirective } from '../shared/directives/modal/modal.directive';

@Component({
  selector: 'wc-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnDestroy {
  images = {
    info: 'assets/images/processed.png',
    error: 'assets/images/error.png'
  };
  modalImage = this.images.error;
  modalMessage: string;
  selectedItemForScan: string;
  postulantId: string;
  postulant: Postulant;
  postulantSubscription: Subscription;
  @ViewChild('postulantProcessedModal', { static: true })
  postulantModal: ModalDirective;

  constructor(private postulantsService: PostulantsService) {}

  ngOnDestroy(): void {
    if (this.postulantSubscription) {
      this.postulantSubscription.unsubscribe();
    }
  }

  processQRCode(postulantId: string): void {
    if (!this.postulantId) {
      this.postulantId = postulantId;
      this.postulantSubscription = this.postulantsService
        .getById(postulantId)
        .pipe(first())
        .subscribe(postulant => {
          if (postulant) {
            this.postulant = postulant;
            this.processScanSelection();
          } else {
            this.modalMessage = 'This does not look like a valid credential';
            this.modalImage = this.images.error;
          }

          setTimeout(() => {
            this.postulantModal.modalInstance.open();
          }, 100);
        });
    }
  }

  cleanData(): void {
    this.postulantId = '';
    this.postulant = null;
    this.postulantSubscription.unsubscribe();
  }

  private processScanSelection(): void {
    const postulantFieldValueForSelection = this.postulant[
      this.selectedItemForScan
    ];

    if (!postulantFieldValueForSelection) {
      this.processScanAccordingToField();
    } else {
      this.modalMessage = 'Assistant was already checked';
      this.modalImage = this.images.error;
    }
  }

  private processScanAccordingToField(): boolean {
    let scanCorrectly = false;

    switch (this.selectedItemForScan) {
      case 'checkIn':
        scanCorrectly = this.postulantsService.checkInAssistant(this.postulant);
        this.modalMessage = scanCorrectly
          ? 'Check in was correct'
          : 'Check in could not be completed. Review if the assistant was accepted';
        break;
      case 'feeForLunchReceived':
        scanCorrectly = this.postulantsService.markFeeForLunchAsReceived(
          this.postulant
        );
        this.modalMessage = scanCorrectly
          ? 'Fee for lunch was received correctly'
          : 'Fee for lunch could not be processed. Review if the assistant made the check in';
        break;
      case 'lunchDelivered':
        scanCorrectly = this.postulantsService.markLunchAsDelivered(
          this.postulant
        );
        this.modalMessage = scanCorrectly
          ? 'Lunch was delivered correctly'
          : 'Lunch could not be processed. Review if the assistant gave her/his fee';
        break;
      case 'firstSnackDelivered':
        scanCorrectly = this.postulantsService.markFirstSnackAsDelivered(
          this.postulant
        );
        this.modalMessage = scanCorrectly
          ? 'First snack was delivered correctly'
          : 'First snack could not be processd. Review if the assistant made the check in';
        break;
      case 'secondSnackDelivered':
        scanCorrectly = this.postulantsService.markSecondSnackAsDelivered(
          this.postulant
        );
        this.modalMessage = scanCorrectly
          ? 'Second snack was delivered correctly'
          : 'Second snack could not be processd. Review if the assistant made the check in';
        break;
      case 'teachersWhoGavePoints':
        scanCorrectly = this.addPointsToAssistant();
        break;
      default:
        this.modalMessage = 'Looks like you did not choose an option';
        break;
    }

    this.modalImage = scanCorrectly ? this.images.info : this.images.error;

    return scanCorrectly;
  }

  private addPointsToAssistant(): boolean {
    this.modalMessage = 'Points were given to the student';
    return true;
  }
}
