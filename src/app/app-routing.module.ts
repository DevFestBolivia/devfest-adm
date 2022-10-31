import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/postulants',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((mod) => mod.LoginModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'postulants',
    loadChildren: () =>
      import('./postulants/postulants.module').then(
        (mod) => mod.PostulantsModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'assistants',
    loadChildren: () =>
      import('./assistants/assistants.module').then(
        (mod) => mod.AssistantsModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'scanner',
    loadChildren: () =>
      import('./scanner/scanner.module').then((mod) => mod.ScannerModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'credentials',
    loadChildren: () =>
      import('./credentials/credentials.module').then(
        (mod) => mod.CredentialsModule,
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
