import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AuthUser } from '../core/models/auth-user.model';
import { PostulantsService } from '../core/services/postulants.service';
import { Postulant } from '../core/models/postulant.model';
import { DataOrder } from '../core/models/data-order.enum';

@Component({
  selector: 'wc-postulants',
  templateUrl: './postulants.component.html',
  styleUrls: ['./postulants.component.scss'],
})
export class PostulantsComponent implements OnInit, OnDestroy {
  currentUser$ = this.auth.getCurrentUser();
  postulants: Postulant[];
  searchTerm = '';
  selectedPostulant: Postulant;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public postulantsService: PostulantsService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.postulantsService
      .getAllSorted('fullName', DataOrder.asc)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((postulants) => {
        this.postulants = postulants;
        this.searchPostulant();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setSelectedPostulant(postulant: Postulant): void {
    this.selectedPostulant = postulant;
  }

  searchPostulant(): void {
    if (this.searchTerm) {
      this.postulants.forEach((postulant) => {
        postulant.visibleInSearch = postulant.fullName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    } else {
      this.postulants.forEach(
        (postulant) => (postulant.visibleInSearch = true),
      );
    }
  }
}
