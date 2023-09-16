import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ListTasksComponent, TaskDetailsComponent],
  imports: [CommonModule, TasksRoutingModule, MaterialModule],
})
export class TasksModule {}
