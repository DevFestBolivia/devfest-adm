import { Component, ViewChildren, QueryList } from '@angular/core';

import { jsPDF } from 'jspdf';

import { PostulantsService } from '../core/services/postulants.service';
import { PostulantCredentialComponent } from '../shared/components/postulant-credential/postulant-credential.component';

const credentialHeight = 455;
const credentialWidth = 280;
const firstItemLeft = 15;
const firstLineTop = 20;
const JPEG = 'JPEG';
const secondItemLeft = 315;
const secondLineTop = 525;

interface CredentialPositionData {
  leftPosition: number;
  topPosition: number;
}

@Component({
  selector: 'wc-credentials',
  templateUrl: './credentials.component.html',
})
export class CredentialsComponent {
  assistants$ = this.postulantsService.getAcceptedPostulants();

  @ViewChildren('credentials')
  private credentials: QueryList<PostulantCredentialComponent>;

  private readonly CREDENTIALS_POSITION_DATA: Record<
    number,
    CredentialPositionData
  > = {
    1: {
      leftPosition: firstItemLeft,
      topPosition: firstLineTop,
    },
    2: {
      leftPosition: secondItemLeft,
      topPosition: firstLineTop,
    },
    3: {
      leftPosition: firstItemLeft,
      topPosition: secondLineTop,
    },
    4: {
      leftPosition: secondItemLeft,
      topPosition: secondLineTop,
    },
  };

  constructor(private postulantsService: PostulantsService) {}

  printCredentials(): void {
    const pdf = new jsPDF('p', 'pt', 'legal');
    const quantityOfCredentials = this.credentials.length;
    let drawCounter = 0;
    let counter = 0;

    this.credentials.forEach((credential) => {
      counter++;
      drawCounter++;

      const credentialData =
        credential.credentialCanvas.nativeElement.toDataURL('image/jpeg', 1.0);
      const { leftPosition, topPosition } =
        this.CREDENTIALS_POSITION_DATA[counter];

      pdf.addImage(
        credentialData,
        JPEG,
        leftPosition,
        topPosition,
        credentialWidth,
        credentialHeight,
      );

      if (counter === 4) {
        if (quantityOfCredentials !== drawCounter) {
          pdf.addPage();
        }

        counter = 0;
      }
    });

    pdf.save('devfest-credentials.pdf');
  }
}
