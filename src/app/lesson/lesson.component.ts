import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LessonService } from './lesson.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})

export class LessonComponent {
  myForm!: FormGroup;

  answers1: Answers = { 'fname1': "inexpensive", 'fname2': "well-made", 'fname3': "stylish", 'fname4': "upmarket", 'fname5': "value for money", 'fname6': "reliable", 'fname7': "timeless" }
  message = ''

  checkAnswers(answers: Answers) {
    this.message = ''
    const formValues = this.myForm.value;

    for (let i = 1; i < 8; i++) {
      console.log(i)
      console.log(formValues[`fname${i}`] == answers[i])
      formValues[`fname${i}`] == answers[i] ? this.message += `Answer ${i} is correct\n` : this.message += `Answer ${i} is incorrect\n`
    }

    window.alert(this.message);
    console.log(formValues['fname']);
  }

  checkField(fname1: String){
    const field = this.myForm.get(`${fname1}`);
    const fieldValue = field?.value ?? '';

    if(fieldValue == '') {
      return;
    }

    const element = document.getElementById(`${fname1}`);

    if (this.answers1[`${fname1}`].toLowerCase() == fieldValue.toLowerCase()){
      this.renderer.setAttribute(element, 'disabled', 'true');
      this.renderer.setStyle(element, 'background-color', '#98FB98');
    } else {
      this.renderer.setStyle(element, 'background-color', '#f9dbbf');
    }
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      fname1: [''],
      fname2: [''],
      fname3: [''],
      fname4: [''],
      fname5: [''],
      fname6: [''],
      fname7: ['']
    });
  }

  constructor(private formBuilder: FormBuilder, private lessonService: LessonService, private renderer: Renderer2) { }

  getData() {
    console.log('ljdwhwui')
    this.lessonService.getData().subscribe(data => {
      this.checkAnswers(data)
      // Обработка полученных данных
    });
  }
}

interface Answers {
  [key: string]: string;
}
