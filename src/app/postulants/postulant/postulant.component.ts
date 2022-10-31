import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth/auth.service';
import { PostulantCredentialComponent } from '../../shared/components/postulant-credential/postulant-credential.component';
import { PostulantsService } from '../../core/services/postulants.service';
import { Postulant } from '../../core/models/postulant.model';

@Component({
  selector: 'wc-postulant',
  templateUrl: './postulant.component.html',
})
export class PostulantComponent implements OnInit, OnDestroy {
  credential: PostulantCredentialComponent;
  currentUser$ = this.auth.getCurrentUser();
  postulant: Postulant;

  private postulantId = this.route.snapshot.paramMap.get('id');
  private unsubscribe$ = new Subject<void>();

  constructor(
    public postulantsService: PostulantsService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.postulantsService
      .getById(this.postulantId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((postulant) => {
        if (postulant) {
          this.postulant = postulant;
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setPostulantCredential(credential: PostulantCredentialComponent): void {
    this.credential = credential;
  }

  printCredential(): void {
    if (this.credential) {
      this.credential.print();
    }
  }
}
