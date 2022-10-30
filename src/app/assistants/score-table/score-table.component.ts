import { Component } from '@angular/core';

import { PostulantsService } from '../../core/services/postulants.service';
import { DataOrder } from '../../core/models/data-order.enum';

@Component({
  selector: 'wc-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss'],
})
export class ScoreTableComponent {
  assistants$ = this.postulantsService.getAllSorted(
    'accumulatedPoints',
    DataOrder.desc,
  );

  constructor(private postulantsService: PostulantsService) {}
}
