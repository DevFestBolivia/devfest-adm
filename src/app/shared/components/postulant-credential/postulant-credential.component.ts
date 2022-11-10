import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { QRCodeComponent } from 'angularx-qrcode';

import { Postulant } from '../../../core/models/postulant.model';

@Component({
  selector: 'wc-postulant-credential',
  templateUrl: './postulant-credential.component.html',
  styleUrls: ['./postulant-credential.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostulantCredentialComponent implements OnInit, OnChanges {
  @Input() canvasWidth: number;
  @Input() canvasHeight: number;
  @Input() postulant: Postulant;

  qrData = 'QR was not generated yet';

  @ViewChild('credentialCanvas', { static: true })
  credentialCanvas: ElementRef;

  @ViewChild('qrCode', { static: true })
  private qrCode: QRCodeComponent;

  @Output() private credentialLoaded = new EventEmitter();

  ngOnInit(): void {
    this.credentialLoaded.emit();
  }

  ngOnChanges(): void {
    this.loadCredential();
  }

  print(): void {
    const printButton = document.createElement('a');
    printButton.download = this.postulant.fullName;
    printButton.href =
      this.credentialCanvas.nativeElement.toDataURL('image/png;base64');
    printButton.click();
  }

  private loadCredential(): void {
    if (this.postulant) {
      this.qrData = this.postulant.id;
      const context = (
        this.credentialCanvas.nativeElement as HTMLCanvasElement
      ).getContext('2d');
      const templateImage = new Image();
      const qrTop = 0;
      const qrLeft = 0;
      const nameTop = 190;
      const nameLeft = this.canvasWidth / 2;

      switch (this.postulant.ticket) {
        case 'VERDE':
          templateImage.src = 'assets/images/bracelet-green.png';
          break;
        case 'AMARILLO':
          templateImage.src = 'assets/images/bracelet-yellow.png';
          break;
        case 'ROJO':
          templateImage.src = 'assets/images/bracelet-red.png';
          break;
      }

      templateImage.onload = () => {
        let qrImage = this.qrCode.qrcElement.nativeElement.querySelector('img');

        if (!qrImage || !qrImage?.src) {
          qrImage =
            this.qrCode.qrcElement.nativeElement.querySelector('canvas');
        }

        if (qrImage) {
          context.drawImage(templateImage, 0, 0);
          context.font = '20px Montserrat';
          context.textAlign = 'center';
          context.fillText('', nameLeft, nameTop);
          context.drawImage(qrImage, qrLeft, qrTop);
        }
      };
    }
  }
}
