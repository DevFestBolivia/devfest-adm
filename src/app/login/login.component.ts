import { Component } from '@angular/core';

import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'wc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(public auth: AuthService) {}
}
