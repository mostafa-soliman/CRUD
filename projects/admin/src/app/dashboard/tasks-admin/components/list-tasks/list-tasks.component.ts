import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../../../manage-users/services/users.service';
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
  dataSource: any = [];
  tasksFilter!: FormGroup;
  page: any = 1;
  total: any;
  filtration: any = {
    page: this.page,
    limit: 10,
  };
  timeOutId: any;

  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadline',
    'status',
    'actions',
  ];

  users: any = [];
  // translate in ts
  // status: any = [{ name: 'Complete' }, { name: 'In-Progress' }];
  status: any = [
    { name: this.translate.instant('tasks.Complete') },
    { name: 'In-Progress' },
  ];
  constructor(
    // استقبل الداتا من دالة تحديث التاسك
    private service: TasksService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService,
    private userSerivce: UsersService
  ) {
    this.getDataFromSubject();
  }

  ngOnInit(): void {
    this.getUsers();
    this.getAllTasks();
  }

  getUsers() {
    // call request
    this.userSerivce.getUserData();
  }
  getDataFromSubject() {
    this.userSerivce.userData.subscribe((res: any) => {
      this.users = this.userMapping(res.data);
    });
  }
  userMapping(data: any[]) {
    let newArray = data?.map((item) => {
      return {
        name: item.username,
        id: item._id,
      };
    });
    return newArray;
  }
  // filtration

  filter(event: any, type: any) {
    // console.log(event.value);
    // console.log(type);

    switch (type) {
      case 'keyword':
        this.page = 1;
        this.filtration['page'] = 1;
        this.filtration['keyword'] = event.value;
        clearTimeout(this.timeOutId);
        this.timeOutId = setTimeout(() => {
          this.getAllTasks();
        }, 2000);

        break;
      case 'userId':
        this.page = 1;
        this.filtration['page'] = 1;
        this.filtration['userId'] = event.value;
        this.getAllTasks();
        break;
      case 'status':
        this.page = 1;
        this.filtration['page'] = 1;
        this.filtration['status'] = event.value.trim();
        this.getAllTasks();
        break;

      case 'fromDate':
      case 'toDate':
        this.page = 1;
        this.filtration['page'] = 1;
        this.filtration[type] = moment(event.value).format('DD-MM-YYYY');
        if (type === 'toDate') {
          this.getAllTasks();
        }
        break;
    }
  }

  // filter(event: any, type: any){
  //   this.filtration[type] = moment(event.value).format('DD-MM-YYYY');
  //   if(type =='toDate'){
  //   this.getAllTasks();
  //   }
  // }

  getAllTasks() {
    this.service.getAllTasks(this.filtration).subscribe((res: any) => {
      this.dataSource = this.mappingTasks(res.tasks);
      this.total = res.totalItems;
      // this.toastr.success('Success get Task', 'Success');
    });
  }
  mappingTasks(data: any[]) {
    let newTasks = data.map((item: any) => {
      return {
        ...item,
        user: item?.userId?.username || null,
      };
    });
    return newTasks;
  }
  addTask() {
    // from angular material
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      disableClose: true,
      // data:
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getAllTasks();
      }
    });
  }
  deleteTask(id: any) {
    this.service.deleteTask(id).subscribe((res) => {
      this.getAllTasks();
      this.toastr.success('Success Deleted Task', 'Success');
    });
  }
  updateTask(element: any) {
    // from angular material
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data: element,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getAllTasks();
      }
    });
    // console.log(dialogRef.componentInstance.data);
  }
  changePage(event: any) {
    this.page = event;
    this.filtration['page'] = event;
    this.getAllTasks();
  }
}
