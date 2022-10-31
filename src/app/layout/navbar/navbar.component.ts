import { Component } from '@angular/core';

import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'wc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  currentUser$ = this.auth.getCurrentUser();

  constructor(public auth: AuthService) {}
}
