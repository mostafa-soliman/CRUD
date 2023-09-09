import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { MaterialModule } from '../../material/material.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';

@NgModule({
  declarations: [AddTaskComponent, ListTasksComponent],
  imports: [CommonModule, MaterialModule, TasksAdminRoutingModule],
})
export class TasksAdminModule {}
