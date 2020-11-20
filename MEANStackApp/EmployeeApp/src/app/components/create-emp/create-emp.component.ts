import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as $ from 'jquery';

import { Employee } from '../../models/employee.model';

import { ToastrService} from 'ngx-toastr';
import { ApiService } from '../../services/CRUD/api.service';

@Component({
  selector: 'app-create-emp',
  templateUrl: './create-emp.component.html',
  styleUrls: ['./create-emp.component.css']
})

export class CreateEmpComponent implements OnInit {
  errorMsg: string;
  empForm: FormGroup;
  empTb: Employee[] = [];

  LoaderX = false;

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, public toastr: ToastrService, 
    private apiService: ApiService) { }

  ngOnInit() {
    $('#validatePhoneNo').keypress(function (event) {
      var maxlength = $(this).attr('max').length;
      var value = $(this).val();
      if (value.toString().length >= maxlength) {
        $(this).val(value.toString().substr(0, maxlength));
      }
      return event.keyCode < 32 || (event.keyCode >= 48 && event.keyCode <= 57);
    });
    this.fetchEmpData();
    this.employeeForm();
  }

  employeeForm() {
    this.empForm = this.fb.group({
      name: ['', [Validators.required] ],
      email: ['', [Validators.required, Validators.email] ],
      brand: ['', [Validators.required] ],
      designation: ['', [Validators.required] ],
      doj: ['', [Validators.required] ],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')] ] 
    });
  }

  fetchEmpData() {
    this.apiService.getEmployees()
    .subscribe((data: Employee[]) => {
      this.empTb = data;
    });
  }

  onSubmitEmpData() {
    for(let i=0; i<this.empTb.length; i++) {
      if(this.empTb[i].email === this.empForm.controls['email'].value) {
        this.LoaderX = true;
        setTimeout(() => {
          this.LoaderX = false;
          this.toastr.error('Email already exists!');
        }, 2000);
        break;
      }
      if(i+1 === this.empTb.length) {
        if(this.empTb[i].email !== this.empForm.controls['email'].value) {
          this.LoaderX = true;
          this.apiService.createEmployee(this.empForm.value)
          .subscribe(
            (data) => { this.empTb.push(data); },
            (error) => { this.errorMsg = error; }
          );
          setTimeout(() => {
            this.router.navigate(['/dashboard/employee-list']);
          }, 2000);
        }
      }
    }
  }
}