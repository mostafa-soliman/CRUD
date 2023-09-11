import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadline',
    'status',
    'actions',
  ];
  dataSource: any = [];
  tasksFilter!: FormGroup;
  users: any = [
    { name: 'Moahmed', id: 1 },
    { name: 'Ali', id: 2 },
    { name: 'Ahmed', id: 3 },
    { name: 'Zain', id: 4 },
  ];

  status: any = [
    { name: 'Complete', id: 1 },
    { name: 'In-Prossing', id: 2 },
  ];
  constructor(
    private service: TasksService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // this.createform();
    this.getAllTasks();
  }

  getAllTasks() {
    this.spinner.show();
    this.service.getAllTasks().subscribe(
      (res: any) => {
        this.dataSource = this.mappingTasks(res.tasks);
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error(error.error.massage);
        this.spinner.hide();
      }
    );
  }
  mappingTasks(data: any[]) {
    let newTasks = data.map((item) => {
      return {
        ...item,
        user: item.userId.username,
      };
    });
    return newTasks;
  }
  addTask() {
    // from angular material
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      // data:
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getAllTasks();
      }
    });
  }
}
