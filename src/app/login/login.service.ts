import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}?email=${email}&password=${password}`; // Замените на ваш конечный путь API
    return this.http.get(url);
  }
}
