import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

import { ApiService } from '../../services/CRUD/api.service';
import { ToastrService} from 'ngx-toastr';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})

export class EditEmpComponent implements OnInit {
  loading = false;
  spinning = false;
  editForm: FormGroup;
  emp: Employee;

  constructor(private apiService: ApiService, private fb: FormBuilder, private actRoute: ActivatedRoute, private location: Location, 
    private router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    $('#validatePhoneNo').keypress(function (event) {
      var maxlength = $(this).attr('max').length;
      var value = $(this).val();
      if (value.toString().length >= maxlength) {
        $(this).val(value.toString().substr(0, maxlength));
      }
      return event.keyCode < 32 || (event.keyCode >= 48 && event.keyCode <= 57);
    });

    if(!sessionStorage.getItem('clark')) {
      this.router.navigate(['/dashboard/employee-list']);
    } else {
      this.updtEmpForm();
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.getEmployee(id);
    }
  }

  updtEmpForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required] ],
      email: ['', [Validators.required, Validators.email] ],
      brand: ['', [Validators.required] ],
      designation: ['', [Validators.required] ],
      doj: ['', [Validators.required] ],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')] ] 
    });
  }

  goBack() {
    this.spinning = true;
    sessionStorage.removeItem('clark');
    setTimeout(() => {
      this.location.back();
    }, 2000);
  }

  getEmployee(id: any) {
    this.apiService.getEmployee(id)
    .subscribe((data) => {
      this.editForm.setValue({
        name: data['name'],
        email: data['email'],
        brand: data['brand'],
        designation: data['designation'],
        doj: data['doj'],
        phoneNumber: data['phoneNumber']
      });
    });
  }

  updateEmployeeData() {
    this.loading = true;
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.updateEmployee(id, this.editForm.value)
    .subscribe(res => {
      sessionStorage.removeItem('clark');
      setTimeout(() => {
        this.router.navigateByUrl('/dashboard/employee-list');
        this.toastr.success(this.editForm.controls['name'].value + ' updated Successfully!');
      }, 2000);
    });
  }
}