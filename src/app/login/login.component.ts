import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router) { }

    handleSubmit() {
    // Получение значения из поля формы
    console.log('Введенное имя:', this.email);
    console.log('Введенное имя2:', this.password);
    // Здесь вы можете использовать значение поля формы для выполнения нужных вам действий
    this.loginService.loginUser(this.email, this.password).subscribe(data => {
      this.router.navigate(['/lessons/1']);
    },
    (error: HttpErrorResponse) => {
      if (error.status === 404) {
        // Обработка ошибки 404
        console.log('Запись не найдена');
      } else {
        // Обработка других ошибок
        console.log('Произошла ошибка', error.message);
      }
    });
  }
}
