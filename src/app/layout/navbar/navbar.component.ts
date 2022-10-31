import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth/auth.service';
import { AuthUser } from '../../core/models/auth-user.model';

@Component({
  selector: 'wc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: AuthUser;

  private unsubscribe$ = new Subject<void>();

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth
      .getCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => (this.currentUser = user));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
