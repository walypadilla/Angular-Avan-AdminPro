import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  constructor() {}

  progreso1 = 15;
  progreso2 = 25;

  getProgreso1(): string {
    return `${this.progreso1}%`;
  }

  getProgreso2(): string {
    return `${this.progreso2}%`;
  }
}
