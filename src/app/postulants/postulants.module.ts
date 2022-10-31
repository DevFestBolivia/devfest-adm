import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PostulantsRoutingModule } from './postulants-routing.module';
import { PostulantsService } from '../core/services/postulants.service';
import { PostulantsComponent } from './postulants.component';
import { PostulantComponent } from './postulant/postulant.component';
import { PostulantCredentialModule } from '../shared/components/postulant-credential/postulant-credential.module';
import { ModalModule } from '../shared/directives/modal/modal.module';

@NgModule({
  declarations: [PostulantsComponent, PostulantComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PostulantsRoutingModule,
    PostulantCredentialModule,
    ModalModule,
  ],
})
export class PostulantsModule {}
