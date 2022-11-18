import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../core/services/auth/auth.service';
import { Postulant } from '../core/models/postulant.model';
import { PostulantsService } from '../core/services/postulants.service';
import { Ticket } from '../core/models/ticket.enum';
import {
  registrationFields,
  workshops,
} from '../core/models/registration.const';

@Component({
  selector: 'wc-assistants',
  templateUrl: './assistants.component.html',
  styleUrls: ['./assistants.component.scss'],
})
export class AssistantsComponent implements OnInit, OnDestroy {
  assistants: Postulant[];
  currentAssistant: Postulant;
  currentUser$ = this.auth.getCurrentUser();
  registrationFields = registrationFields;
  searchTerm = '';
  workshops = workshops;

  Ticket = Ticket;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public postulantsService: PostulantsService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.postulantsService
      .getAcceptedPostulants()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((assistants) => {
        this.assistants = assistants;
        this.searchAssistant();
        this.currentAssistant = this.assistants[0];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchAssistant(): void {
    if (this.searchTerm) {
      this.assistants.forEach(
        (assistant) =>
          (assistant.visibleInSearch = assistant.fullName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())),
      );
    } else {
      this.assistants.forEach(
        (assistant) => (assistant.visibleInSearch = true),
      );
    }
  }
}
