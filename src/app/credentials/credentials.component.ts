import { Component, ViewChildren, QueryList } from '@angular/core';

import { jsPDF } from 'jspdf';

import { PostulantsService } from '../core/services/postulants.service';
import { PostulantCredentialComponent } from '../shared/components/postulant-credential/postulant-credential.component';

const firstLineTop = 20;
const secondLineTop = 525;
const firstItemLeft = 15;
const secondItemLeft = 315;
const JPEG = 'JPEG';

@Component({
  selector: 'wc-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss'],
})
export class CredentialsComponent {
  assistants$ = this.postulantsService.getAcceptedPostulants();

  @ViewChildren('credentials')
  credentials: QueryList<PostulantCredentialComponent>;

  constructor(private postulantsService: PostulantsService) {}

  printCredentials(): void {
    const pdf = new jsPDF('p', 'pt', 'legal');
    const quantityOfCredentials = this.credentials.length;
    let drawCounter = 0;
    let counter = 0;

    this.credentials.forEach((credential) => {
      counter++;

      const credentialData =
        credential.credentialCanvas.nativeElement.toDataURL('image/jpeg', 1.0);

      switch (counter) {
        case 1:
          pdf.addImage(
            credentialData,
            JPEG,
            firstItemLeft,
            firstLineTop,
            280,
            455,
          );
          drawCounter++;
          break;
        case 2:
          pdf.addImage(
            credentialData,
            JPEG,
            secondItemLeft,
            firstLineTop,
            280,
            455,
          );
          drawCounter++;
          break;
        case 3:
          pdf.addImage(
            credentialData,
            JPEG,
            firstItemLeft,
            secondLineTop,
            280,
            455,
          );
          drawCounter++;
          break;
        case 4:
          pdf.addImage(
            credentialData,
            JPEG,
            secondItemLeft,
            secondLineTop,
            280,
            455,
          );
          drawCounter++;
          if (quantityOfCredentials !== drawCounter) {
            pdf.addPage();
          }
          counter = 0;
          break;
      }
    });

    pdf.save('wc-credentials.pdf');
  }
}
