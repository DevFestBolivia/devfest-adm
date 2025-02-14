import { Component, ViewChildren, QueryList } from '@angular/core';

import { jsPDF } from 'jspdf';
import JSZip from 'jszip/dist/jszip';
import * as FileSaver from 'file-saver';

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

  // TODO: Remove this and the jsPDF library if it won't be used anymore
  printCredentials(): void {
    const pdf = new jsPDF('p', 'pt', 'legal');
    const quantityOfCredentials = this.credentials.length;
    let drawCounter = 0;
    let counter = 0;

    this.credentials.forEach((credential) => {
      counter++;
      drawCounter++;

      const credentialData =
        credential.credentialCanvas.nativeElement.toDataURL('image/jpg', 1.0);
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

  exportImages(): void {
    let itemsName = [];
    let items = [];

    this.credentials.forEach((credential) => {
      let item = document.getElementById(
        'assistant-' + credential.postulant.id,
      );
      const image = item.querySelector('canvas').toDataURL('image/jpg', 1.0);

      let blobData = this.convertBase64ToBlob(image);

      const blob = new Blob([blobData], { type: 'image/jpg' });
      itemsName.push('Assistant - ' + credential.postulant.fullName);
      items.push(blob);
    });

    var zip = new JSZip();
    items.forEach((value, i) =>
      zip.file(itemsName[i] + '.jpg', value, { base64: true }),
    );

    zip
      .generateAsync({ type: 'blob' })
      .then((content) => FileSaver.saveAs(content, 'bracelets.zip'));
  }

  private convertBase64ToBlob(base64Image: string): Blob {
    const parts = base64Image.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);

    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: imageType });
  }
}
