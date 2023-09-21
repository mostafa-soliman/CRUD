import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getUserTasks(userId: string, tasksParams: any) {
    let params = new HttpParams();
    Object.entries(tasksParams).forEach(([key, value]: any) => {
      params = params.append(key, value);
    });
    return this.http.get(
      'https://mostafa-2a48.onrender.com/tasks/user-tasks/' + userId,
      { params }
    );
  }
  completeTask(model: any) {
    return this.http.put(
      'https://mostafa-2a48.onrender.com/tasks/complete',
      model
    );
  }
  detailsTask(taskId: any) {
    return this.http.get(
      'https://mostafa-2a48.onrender.com/tasks/task/' + taskId
    );
  }
}
