import { Component } from '@angular/core';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent {
  TASK_NUMBER = 3;
  TASK_NUMBER_ARRAY = Array.from({ length: this.TASK_NUMBER }, (_, i) => i + 1);
}
