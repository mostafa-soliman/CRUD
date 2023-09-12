import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  getAllTasks() {
    // add this 2 line to each request
    /*But it is better to use an interceptor (new file)*/
    /* let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get('https://mostafa-2a48.onrender.com/tasks/all-tasks', {
      headers,
    });*/
    // return this.http.get(environment.baseAPI + '/all-tasks');
    return this.http.get('https://mostafa-2a48.onrender.com/tasks/all-tasks');
  }
  createTask(model: any) {
    // return this.http.post(environment.baseAPI + '/add-task', model);
    return this.http.post(
      'https://mostafa-2a48.onrender.com/tasks/add-task',
      model
    );
  }
  updateTask(model: any, id: any) {
    // return this.http.post(environment.baseAPI + '/add-task', model);
    return this.http.put(
      'https://mostafa-2a48.onrender.com/tasks/edit-task/' + id,
      model
    );
  }
  deleteTask(id: any) {
    return this.http.delete(
      'https://mostafa-2a48.onrender.com/tasks/delete-task/' + id
    );
  }
}

// intercepter عبارة عن بوابة بين  الريكوست و الرسبونس وكدة تقدر تنفذ اي لوجيك محتاج تنفذة على كل جزء في المشروع و كمان تهندل كل الايرور اللي جيه من الريكوستات
