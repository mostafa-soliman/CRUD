import { login } from './../../../../../admin/src/app/auth/context/dtos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(
      'https://mostafa-2a48.onrender.com/auth/login',
      model
    );
  }
  createAccount(model: any) {
    return this.http.post(
      'https://mostafa-2a48.onrender.com/auth/createAccount',
      model
    );
  }
}
