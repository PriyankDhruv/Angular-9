import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Login } from 'src/app/models/login';
import { RegisterService } from '../../services/REGISTER/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  credentialTb = [];
  x: number = 1;
  public logForm: FormGroup;

  constructor(public regService: RegisterService, private router: Router, public fb: FormBuilder, public toastr: ToastrService) { }

  ngOnInit() { 
    this.LoginForm();
    this.fetchUserData();
  }

  fetchUserData() {
    this.regService.GetUsersList().valueChanges()
    .subscribe(
      (data: Login[]) => { this.credentialTb = data; },
      (error) => { console.log(error); }
    )
  }

  LoginForm() {
    this.logForm = this.fb.group({
      userName: ['', [Validators.required] ],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(9)] ]
    });
  }

  login() {
      for(let i=0; i<this.credentialTb.length; i++) {
        if(this.credentialTb[i].userName === this.logForm.controls['userName'].value && 
          this.credentialTb[i].password === this.logForm.controls['password'].value) {
          this.loading = true;
          sessionStorage.setItem('priyank', 'dhruv');
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
            this.toastr.success('You have login Successfully!');
          }, 2000);
          break;
        }
        if(i+1 === this.credentialTb.length) {
          if(this.credentialTb[i+1].userName !== this.logForm.controls['userName'].value && 
            this.credentialTb[i+1].userName !== this.logForm.controls['password'].value) {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.toastr.error('Invalid username or password!');
            }, 2000);
          }
        }
      }
  }
}