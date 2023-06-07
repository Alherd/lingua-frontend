import { Component } from '@angular/core';
import { LessonService } from './lesson.service';
import { Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})

export class LessonComponent {
  templateId: string = '';
  jsonData: any;
  completedAnswers: any;

  checkField(fname1: String, fname2: String, answer: String) {
    console.log(fname1, fname2, answer)
    const element = document.getElementById(`fname${fname1}${fname2}`) as HTMLInputElement;
    const fieldValue = element?.value ?? '';

    if (fieldValue == '') {
      return;
    }

    if (answer.toLowerCase() == fieldValue.toLowerCase()) {
      this.renderer.setAttribute(element, 'disabled', 'true');
      this.renderer.setStyle(element, 'background-color', '#98FB98');
      this.lessonService.setCompletedForms(this.templateId, `fname${fname1}${fname2}`)
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
    private renderer: Renderer2, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.templateId = params.get('id') || '';
      this.loadJsonData();
      this.getCompletedForms();
      this.hideAnswers();
    });
  }

  loadJsonData() {
    this.http.get(`assets/${this.templateId}.json`).subscribe(data => {
      this.jsonData = data;
      console.log('jsonf=data')
      console.log(this.jsonData.tasks[2].answers[0])
    });
  }

  getCompletedForms() {
    this.lessonService.getCompletedForms(this.templateId).subscribe(data => {
      (data as Forms).forms.forEach(fname => {
        const element = document.getElementById(`${fname}`) as HTMLInputElement;

        this.renderer.setProperty(element, 'value', this.getAnswerByFname(fname));
        this.renderer.setAttribute(element, 'disabled', 'true');
        this.renderer.setStyle(element, 'background-color', '#98FB98');
      });
    });
  }

  formatText(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  getAnswerByFname(fname: any) {
    const regex = /\d/g;
    const indexArray = fname.match(regex)

    return this.jsonData.tasks[indexArray[0]].answers[indexArray[1]];
  }

  clickPrev() {
    if (parseInt(this.templateId) > 1) {
      this.router.navigate([`/lessons/${parseInt(this.templateId) - 1}`]);
    }
  }

  clickNext() {
    if (parseInt(this.templateId) < 3) {
      this.router.navigate([`/lessons/${parseInt(this.templateId) + 1}`]);
    }
  }

  showAnswers() {
    const element = document.getElementById('answers_list') as HTMLInputElement;
    this.renderer.setAttribute(element, 'style', 'display: block');
  }

  hideAnswers() {
    const element = document.getElementById('answers_list') as HTMLInputElement;
    this.renderer.setAttribute(element, 'style', 'display: none');
  }

  cleanAnswers(){
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i] as HTMLInputElement;
      this.renderer.setStyle(input, 'background-color', '#fff');
      input.removeAttribute('disabled');
      input.value = ''; // Очистка значения поля ввода
    }
    this.lessonService.cleanAnswers(this.templateId)
  }
}

interface Forms {
  forms: any[];
}
