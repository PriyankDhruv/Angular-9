import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

import { Register } from '../../models/register';
import { RegisterService } from '../../services/REGISTER/register.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  loading = false;
  userTb = [];
  public regForm: FormGroup;

  constructor(public regService: RegisterService, public fb: FormBuilder, private router: Router, public toastr: ToastrService) { }

  ngOnInit() { 
    this.regService.GetUsersList();
    $('#validatePhoneNo').keypress(function (event) {
      var maxlength = $(this).attr('max').length;
      var value = $(this).val();
      if (value.toString().length >= maxlength) {
        $(this).val(value.toString().substr(0, maxlength));
      }
      return event.keyCode < 32 || (event.keyCode >= 48 && event.keyCode <= 57);
    });
    this.registerForm();
    this.fetchUserData();
  }

  fetchUserData() {
    this.regService.GetUsersList().valueChanges()
    .subscribe(
      (data: Register[]) => { this.userTb = data; },
      (error) => { console.log(error); }
    )
  }

  registerForm() {
    this.regForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)] ],
      email: ['', [Validators.required, Validators.email] ],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(9)] ],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)] ]
    });
  }

  submitUserData() {
    for(let i=0; i<this.userTb.length; i++) {
      if(this.userTb[i].email === this.regForm.controls['email'].value) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.toastr.error('Email already exists!');    
        }, 2000);
        break;
      }
      if(i+1 === this.userTb.length) {
        if(this.userTb[i+1].email !== this.regForm.controls['email'].value) {
          this.loading = true;
          this.regService.RegisterStudent(this.regForm.value);
          setTimeout(() => {
            this.router.navigate(['/login']);
            this.toastr.success('You have registered Successfully!');
          }, 2000);
        }
      }
    }
  }
}