import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { MaterialModule } from '../../material/material.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [AddTaskComponent, ListTasksComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TasksAdminRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TasksAdminModule {}
