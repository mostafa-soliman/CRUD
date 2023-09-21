import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface ChangeStatus {
  id: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(filter: any) {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]: any) => {
      if (value) {
        params = params.append(key, value);
      }
    });
    return this.http.get('https://mostafa-2a48.onrender.com/auth/users', {
      params,
    });
  }
  deleteUser(id: string) {
    return this.http.delete(
      'https://mostafa-2a48.onrender.com/auth/user/' + id
    );
  }
  changeStatus(model: ChangeStatus) {
    return this.http.put(
      'https://mostafa-2a48.onrender.com/auth/user-status',
      model
    );
  }
}
