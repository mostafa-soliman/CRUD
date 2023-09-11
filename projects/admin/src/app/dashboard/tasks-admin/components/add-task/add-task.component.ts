import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  newTaskForm!: FormGroup;
  fileName: string = '';
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private service: TasksService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  // "mocking data" or "dummy data"
  users: any = [
    { name: 'Moahmed', id: '64fdd97a676bf778ff8e1ad4' },
    { name: 'Ali', id: '64fdda1c676bf778ff8e1ad7' },
    { name: 'Ahmed', id: '64fdda4a676bf778ff8e1ada' },
    { name: 'Zain', id: '64fdda6e676bf778ff8e1add' },
  ];
  ngOnInit(): void {
    this.createform();
  }

  createform() {
    this.newTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      userId: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
    });
  }
  // selectImg(event: any) {
  //   this.fileName = event.target.value;
  //   this.newTaskForm.get('image')?.setValue(event.target.file[0]);
  //   console.log(event);
  // }
  selectImg(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.newTaskForm.get('image')?.setValue(file); // تعيين الصورة ككائن File
      console.log(event);
    }
  }
  createTask() {
    this.spinner.show();
    // console.log(this.newTaskForm.value);
    // In order to be able to send files, you must create formData
    // let formData = new FormData();
    /*****To make the Reactive Form work dynamically instead of the manual method through a function */
    //****  get data from reactive form (key , value)
    // formData.append('title', this.newTaskForm.value['title']);
    // formData.append('userId', this.newTaskForm.value['userId']);
    // // فى مشكلة انه مبيبعت الصورة بينري ولكن بيبعت مسارها و مش عارف احلها
    // formData.append('image', this.newTaskForm.value['image']);
    // formData.append('description', this.newTaskForm.value['description']);
    // formData.append('deadline', this.newTaskForm.value['deadline']);
    // this.service.createTask(formData).subscribe((res) => {});
    let model = this.prepereFormData();
    this.service.createTask(model).subscribe(
      (res) => {
        this.toastr.success('Success Created Task', 'Success');
        this.spinner.hide();
        this.dialog.close(true);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.message);
      }
    );
  }
  // clossesDialog() {
  //   this.dialog.close(true);
  // }

  // *** get data from reactive form (key , value) Dynamic

  // prepereFormData() {
  //   // change format Date by moment library ---> npm install --save moment
  //   let newData = moment(this.newTaskForm.value['deadline']).format(
  //     'DD/MM/YYYY'
  //   );
  //   // this.newTaskForm.get('deadline')?.setValue(newData);
  //   // In order to be able to send files, you must create formData
  //   let formData = new FormData();
  //   Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
  //     //We use if so that only the value of newData is changed without error The real value does not change in angular, it only changes the format
  //     if (key == 'deadline') {
  //       formData.append(key, newData);
  //     } else {
  //       formData.append(key, value);
  //     }
  //   });
  //   return formData;
  // }
  // ********************فهم تحوول الصورة الي بينري كان ضعيف يحتاج الي مراجعة وفهم *****************
  prepereFormData() {
    let newData = moment(this.newTaskForm.value['deadline']).format(
      'DD/MM/YYYY'
    );

    const formData = new FormData();
    // تحويل الصورة إلى بيانات ثنائية وإضافتها إلى FormData
    formData.append('image', this.newTaskForm.get('image')?.value);

    // الآن نحذف حقل الصورة من النموذج حيث تمت إضافته بالفعل إلى FormData
    const formValueWithoutImage = { ...this.newTaskForm.value };
    delete formValueWithoutImage.image;

    // تكملة إضافة القيم الأخرى إلى FormData
    Object.entries(formValueWithoutImage).forEach(([key, value]: any) => {
      // نستخدم if لضمان أن القيمة التي تم تغييرها هي القيمة الجديدة دون أخطاء
      if (key == 'deadline') {
        formData.append(key, newData);
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  }
}
