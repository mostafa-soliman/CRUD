import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../context/dtos';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(model: login) {
    // return this.http.post( environment.baseAPI.replace('tasks', 'auth') + '/login', model);
    return this.http.post(
      'https://mostafa-2a48.onrender.com/auth/login',
      model
    );
  }
}
