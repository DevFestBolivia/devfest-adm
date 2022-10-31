import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsRoutingModule } from './credentials-routing.module';
import { CredentialsComponent } from './credentials.component';
import { PostulantsService } from '../core/services/postulants.service';
import { PostulantCredentialModule } from '../shared/components/postulant-credential/postulant-credential.module';

@NgModule({
  declarations: [CredentialsComponent],
  imports: [CommonModule, CredentialsRoutingModule, PostulantCredentialModule],
})
export class CredentialsModule {}
