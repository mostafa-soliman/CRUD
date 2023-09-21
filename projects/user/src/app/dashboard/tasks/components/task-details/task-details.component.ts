import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskId: any;
  taskDetails: any;
  constructor(
    private service: TasksService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // get id from url
    this.route.paramMap.subscribe((res: any) => {
      console.log(res.params['id']);
      this.taskId = res.params['id'];
    });
  }
  ngOnInit(): void {
    this.getDetails();
  }
  getDetails() {
    this.service.detailsTask(this.taskId).subscribe((res: any) => {
      console.log('ditalseee' + res);
      this.taskDetails = res.tasks;
    });
  }
  complete() {
    const MODEL = {
      id: this.taskId,
    };
    this.service.completeTask(MODEL).subscribe((res) => {
      this.router.navigate(['/tasks']);
      this.toastr.success('Task Complete Successfully', 'success');
    });
  }
}
