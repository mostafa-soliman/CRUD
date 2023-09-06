import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';


@NgModule({
  declarations: [
    AddTaskComponent,
    ListTasksComponent
  ],
  imports: [
    CommonModule,
    TasksAdminRoutingModule
  ]
})
export class TasksAdminModule { }
