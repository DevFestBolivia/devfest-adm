import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../core/services/auth/auth.service';
import { PostulantsService } from '../core/services/postulants.service';
import { Postulant } from '../core/models/postulant.model';
import { DataOrder } from '../core/models/data-order.enum';
import { Ticket } from '../core/models/ticket.enum';

@Component({
  selector: 'wc-postulants',
  templateUrl: './postulants.component.html',
  styleUrls: ['./postulants.component.scss'],
})
export class PostulantsComponent implements OnInit, OnDestroy {
  currentUser$ = this.auth.getCurrentUser();
  postulants: Postulant[] = [];
  searchTerm = '';
  selectedPostulant: Postulant;

  Ticket = Ticket;

  get visiblePostulants(): Postulant[] {
    return this.postulants.filter((postulant) => postulant.visibleInSearch);
  }

  private currentFilter: Ticket | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public postulantsService: PostulantsService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.setPostulants();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  applyTicketFilter(ticket: Ticket | null): void {
    if (ticket === this.currentFilter) {
      return;
    }

    this.currentFilter = ticket;

    if (this.currentFilter) {
      this.postulantsService
        .getPostulantsByTicket(this.currentFilter)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((postulants) => {
          this.postulants = postulants;
          this.searchPostulant();
        });
    } else {
      this.setPostulants();
    }
  }

  setSelectedPostulant(postulant: Postulant): void {
    this.selectedPostulant = postulant;
  }

  searchPostulant(): void {
    if (this.searchTerm) {
      this.postulants.forEach(
        (postulant) =>
          (postulant.visibleInSearch = postulant.fullName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())),
      );
    } else {
      this.postulants.forEach(
        (postulant) => (postulant.visibleInSearch = true),
      );
    }
  }

  private setPostulants(): void {
    this.postulantsService
      .getAllSorted('fullName', DataOrder.asc)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((postulants) => {
        this.postulants = postulants;
        this.searchPostulant();
      });
  }
}
