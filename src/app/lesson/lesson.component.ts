import { Component } from '@angular/core';
import { LessonService } from './lesson.service';
import { Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private renderer: Renderer2, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  getData() {
    this.lessonService.getData().subscribe(data => {
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.templateId = params.get('id') || '';
      this.loadJsonData();
      this.getCompletedForms();
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
}

interface Forms {
  forms: any[];
}
