import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { StarRatingModule } from 'angular-star-rating';

import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerComponent } from './scanner.component';
import { PostulantsService } from '../core/services/postulants.service';
import { ModalModule } from '../shared/directives/modal/modal.module';
import { SelectModule } from '../shared/directives/select/select.module';

@NgModule({
  declarations: [ScannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ScannerRoutingModule,
    StarRatingModule.forRoot(),
    ModalModule,
    SelectModule,
    ZXingScannerModule,
  ],
})
export class ScannerModule {}
