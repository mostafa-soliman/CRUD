import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../../tasks-admin/services/tasks.service';
import { ChangeStatus, UsersService } from '../../services/users.service';
import * as moment from 'moment';
// export interface PeriodicElement {
//   name: string;
//   email: string;
//   tasksAssigned: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { name: 'Hydrogen', email: '1.0079', tasksAssigned: '10-11-2022' },
//   { name: 'Helium', email: '4.0026', tasksAssigned: '10-11-2022' },
//   { name: 'Lithium', email: '6.941', tasksAssigned: '10-11-2022' },
//   { name: 'Beryllium', email: '9.0122', tasksAssigned: '10-11-2022' },
//   { name: 'Boron', email: '10.811', tasksAssigned: '10-11-2022' },
//   { name: 'Carbon', email: '12.010', tasksAssigned: '10-11-2022' },
//   { name: 'Nitrogen', email: '14.006', tasksAssigned: '10-11-2022' },
//   { name: 'Oxygen', email: '15.999', tasksAssigned: '10-11-2022' },
//   { name: 'Fluorine', email: '18.998', tasksAssigned: '10-11-2022' },
//   { name: 'Neon', email: '20.179', tasksAssigned: '10-11-2022' },
// ];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'tasksAssigned',
    'actions',
  ];
  // dataSource = ELEMENT_DATA;
  dataSource: any = [];
  page = 1;
  totalItem: any;
  filtration: any = {
    page: this.page,
    limit: 10,
  };
  timeOutId: any;
  constructor(
    private service: UsersService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getUserData();
    console.log('rrrrrrrrrrr');
  }

  getUserData() {
    const Model = {
      page: this.page,
      limit: 10,
      name: '',
    };
    this.service.getAllUsers(Model).subscribe((res: any) => {
      this.totalItem = res.totalItems;
      console.log(res.totalItems);
      this.dataSource = res.users;
      console.log(res.users);
    });
  }
  deleteUser(id: string, index: number) {
    if (this.dataSource[index].assignedTasks > 0) {
      this.toastr.error(
        "you can't delete this user until finish his tasks ",
        'error'
      );
    } else {
      this.service.deleteUser(id).subscribe((res) => {
        this.toastr.success('Success Deleted Task', 'Success');
        this.page = 1;
        this.getUserData();
      });
    }
  }
  changePage(event: any) {
    this.page = event;
    this.filtration['page'] = event;
    this.getUserData();
  }
  changeUserStatus(id: string, status: string, index: number) {
    const Model: ChangeStatus = {
      id: id,
      status: status,
    };

    if (this.dataSource[index].assignedTasks > 0) {
      this.toastr.error(
        "you can't update this user until finish his tasks ",
        'error'
      );
    } else {
      this.service.changeStatus(Model).subscribe((res) => {
        this.toastr.success('Success Change Status User', 'Success');
        this.page = 1;
        this.getUserData();
      });
    }
  }
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
          this.getUserData();
        }, 2000);

        break;
      case 'userId':
        this.page = 1;
        this.filtration['page'] = 1;
        this.filtration['userId'] = event.value;
        this.getUserData();
        break;
      case 'status':
        this.page = 1;
        this.filtration['page'] = 1;
        this.filtration['status'] = event.value.trim();
        this.getUserData();
        break;

      case 'fromDate':
      case 'toDate':
        this.page = 1;
        this.filtration['page'] = 1;
        this.filtration[type] = moment(event.value).format('DD-MM-YYYY');
        if (type === 'toDate') {
          this.getUserData();
        }
        break;
    }
  }
}
