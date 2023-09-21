import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface ChangeStatus {
  id: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  userData = new BehaviorSubject({});
  getAllUsers(filter: any) {
    let params = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        if (value) {
          params = params.append(key, value);
        }
      });
    }
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
  getUserData(model?: any) {
    this.getAllUsers(model).subscribe((res: any) => {
      this.userData.next({
        data: res.users,
        total: res.totalItems,
      });
    });
  }
}
