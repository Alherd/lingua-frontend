import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LessonComponent } from './lesson.component';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const url = `${this.apiUrl}lesson`; // Замените на ваш конечный путь API
    return this.http.get(url);
  }

  setCompletedForms(task_id: string, fname: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.apiUrl}set_completed_fname`;
    const data = { "task_id": task_id, "fname": fname }

    this.http.post(url, data, { headers }).subscribe(
      response => {
        console.log('Успешный POST-запрос', response);
        // Обработайте ответ, который вернул сервер
      },
      error => {
        console.error('Ошибка при выполнении POST-запроса', error);
        // Обработайте ошибку, если произошла
      }
    );
  }

  getCompletedForms(task_id: string) {
    return this.http.get(`${this.apiUrl}form?task_id=${task_id}`);
  }

  cleanAnswers(task_id: string){
    console.log('clean form')
    console.log(`${this.apiUrl}clean?task_id=${task_id}`)

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(`${this.apiUrl}clean?task_id=${task_id}`, {'task_id': task_id}, { headers }).subscribe(
      response => {
        console.log('Успешный POST-запрос on clean', response);
        // Обработайте ответ, который вернул сервер
      },
      error => {
        console.error('Ошибка при выполнении POST-запроса on clean', error);
        // Обработайте ошибку, если произошла
      }
    );
  }
}
