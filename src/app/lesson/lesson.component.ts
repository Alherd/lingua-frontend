import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})


export class LessonComponent {
  myForm!: FormGroup;

  answers: Answers = { "1": "inexpensive", 2: "well-made", 3: "stylish", 4: "upmarket", 5: "value for money", 6: "reliable", 7: "timeless" }
  message = ''

  checkAnswers() {
    this.message = ''
    const formValues = this.myForm.value;

    for (let i = 1; i < 8; i++) {
      console.log(i)
      console.log(formValues[`fname${i}`] == this.answers[i])
      formValues[`fname${i}`] == this.answers[i] ? this.message += `Answer ${i} is correct\n` : this.message += `Answer ${i} is incorrect\n`
    }

    window.alert(this.message);
    console.log(formValues['fname']);
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

  constructor(private formBuilder: FormBuilder) { }
}

interface Answers {
  [key: number]: string;
}
