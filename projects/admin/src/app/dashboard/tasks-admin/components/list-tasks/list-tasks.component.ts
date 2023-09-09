import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    status: 'Complete',
    title: 'Hydrogen',
    user: '1.0079',
    deadLineDate: '10-11-2022',
  },
  {
    status: 'In-Prossing',
    title: 'Helium',
    user: '4.0026',
    deadLineDate: '10-11-2022',
  },
  {
    status: 'Complete',
    title: 'Lithium',
    user: '6.941',
    deadLineDate: '10-11-2022',
  },
  {
    status: 'Complete',
    title: 'Beryllium',
    user: '9.0122',
    deadLineDate: '10-11-2022',
  },
  {
    status: 'Complete',
    title: 'Boron',
    user: '10.811',
    deadLineDate: '10-11-2022',
  },
  {
    status: 'Complete',
    title: 'Carbon',
    user: '12.010',
    deadLineDate: '10-11-2022',
  },
  {
    status: 'Complete',
    title: 'Nitrogen',
    user: '14.006',
    deadLineDate: '10-11-2022',
  },
  {
    status: 'Complete',
    title: 'Oxygen',
    user: '15.999',
    deadLineDate: '10-11-2022',
  },
  {
    status: 'Complete',
    title: 'Fluorine',
    user: '18.998',
    deadLineDate: '10-11-2022',
  },
  {
    status: 'Complete',
    title: 'Neon',
    user: '20.179',
    deadLineDate: '10-11-2022',
  },
];
// **************************************************************
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
    'deadLineDate',
    'status',
    'actions',
  ];
  dataSource = ELEMENT_DATA;
  newTaskForm!: FormGroup;
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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createform();
    this.getAllTasks();
  }

  createform() {
    this.newTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
    });
  }

  getAllTasks() {
    this.service.getAllTasks().subscribe(
      (res) => {},
      (error) => {}
    );
  }
  addTask() {
    // from angular material
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      // data:
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllTasks();
      }
    });
  }
}
