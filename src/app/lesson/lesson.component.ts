import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LessonService } from './lesson.service';
import { Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})

export class LessonComponent {
  myForm!: FormGroup;

  answers1: Answers = { 'fname1': "inexpensive", 'fname2': "well-made", 'fname3': "stylish", 'fname4': "upmarket", 'fname5': "value for money", 'fname6': "reliable", 'fname7': "timeless" }
  message = ''

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
      // Выполните необходимые операции с каждым элементом input
      if (!input.disabled) {
        console.log('return')
        isAllDisabled = false;
      }
    });

    if (isAllDisabled) {
      console.log('TASK COMPLETED');
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Получаем параметры маршрута
      const pageId = params.get('pageId');
    });
  }

  constructor(private lessonService: LessonService,
    private renderer: Renderer2, private route: ActivatedRoute) { }

  getData() {
    console.log('ljdwhwui')
    this.lessonService.getData().subscribe(data => {
      // this.checkAnswers(data)
      // Обработка полученных данных
    });
  }
}

interface Answers {
  [key: string]: string;
}
