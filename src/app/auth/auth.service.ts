import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable, of, timer } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { AuthUserService } from './auth-user.service';
import { AuthUser } from '../core/models/auth-user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loading = false;
  message: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: AuthUserService,
  ) {}

  getCurrentUser(): Observable<AuthUser> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.getById(user.uid);
        }

        return of(null);
      }),
    );
  }

  login(email: string, password: string): void {
    this.loading = true;

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((credential) => {
        this.message = '';
        this.userService
          .assertAuthUser(credential.user)
          .pipe(first())
          .subscribe((_) => this.router.navigate(['']));

        timer(500).subscribe(() => (this.loading = false));
      })
      .catch((err) => {
        this.message = err;
        this.loading = false;
      });
  }

  logout(): void {
    this.afAuth
      .signOut()
      .then((_) => this.router.navigate(['/login']))
      .catch((err) => console.error(err));
  }
}
