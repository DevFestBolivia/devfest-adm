import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { AuthUser } from '../../models/auth-user.model';
import { Roles } from '../../models/roles.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const path = next.routeConfig.path;

    return this.auth.getCurrentUser().pipe(
      first(),
      map((user) => {
        if (user) {
          return this.checkAccess(user, path);
        } else if (path === 'login') {
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      }),
    );
  }

  private checkAccess(user: AuthUser, path: string): boolean {
    const roles = user.roles;
    let hasAccess = false;

    switch (path) {
      case 'login':
        hasAccess = false;
        break;
      case 'postulants':
      case 'credentials':
        hasAccess = roles.admin;
        break;
      case 'assistants':
        hasAccess = roles.admin || roles.staff;
        break;
      case 'scanner':
        hasAccess = true;
        break;
    }

    this.redirectHomeIfNeeded(hasAccess, roles);

    return hasAccess;
  }

  private redirectHomeIfNeeded(hasAccess: boolean, roles: Roles): void {
    if (!hasAccess) {
      if (roles.admin) {
        this.router.navigate(['/postulants']);
      } else if (roles.staff) {
        this.router.navigate(['/assistants']);
      } else {
        this.router.navigate(['/scanner']);
      }
    }
  }
}
