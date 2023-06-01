import { Component } from '@angular/core';
import { LessonService } from './lesson.service';
import { Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})

export class LessonComponent {
  templateId: string = '';

  checkField(fname: String, answer: String) {
    const element = document.getElementById(`${fname}`) as HTMLInputElement;
    const fieldValue = element?.value ?? '';

    if (fieldValue == '') {
      return;
    }

    if (answer.toLowerCase() == fieldValue.toLowerCase()) {
      this.renderer.setAttribute(element, 'disabled', 'true');
      this.renderer.setStyle(element, 'background-color', '#98FB98');
    } else {
      this.renderer.setStyle(element, 'background-color', '#f9dbbf');
    }

    const div = document.getElementById('lesson1_container_content');
    const inputElements = div?.querySelectorAll('input');

    var isAllDisabled: Boolean = true;
    inputElements?.forEach((input: HTMLInputElement) => {
      if (!input.disabled) {
        console.log('return')
        isAllDisabled = false;
      }
    });

    if (isAllDisabled) {
      console.log('TASK COMPLETED');
    }
  }

  constructor(private lessonService: LessonService,
    private renderer: Renderer2, private activatedRoute: ActivatedRoute) { }

  getData() {
    this.lessonService.getData().subscribe(data => {
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.templateId = params.get('id') || '';
    });
  }
}
