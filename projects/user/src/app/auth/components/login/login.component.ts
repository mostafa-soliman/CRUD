import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createForm();
  }
  createForm() {
    // curate form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      role: ['user'],
    });
  }

  login() {
    this.service.login(this.loginForm.value).subscribe((res: any) => {
      // console.log(this.loginForm.value);
      this.router.navigate(['/tasks']);
      localStorage.setItem('token', res.token);
      this.toastr.success('Hello world!', 'Toastr fun!');
    });
  }
}
