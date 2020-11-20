import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

import { CrudService } from '../../services/CRUD/crud.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {
  loading = false;
  public stdForm: FormGroup;

  constructor(public crudService: CrudService, public fb: FormBuilder, private router: Router, public toastr: ToastrService) { }

  ngOnInit() { 
    if(!sessionStorage.getItem('clark')) {
      this.router.navigate(['/dashboard/view-students']);
    }
    this.crudService.GetStudentsList();
    $('#validateEnrollNo').keypress(function (event) {
      var maxlength = $(this).attr('max').length;
      var value = $(this).val();
      if (value.toString().length >= maxlength) {
        $(this).val(value.toString().substr(0, maxlength));
      }
      return event.keyCode < 32 || (event.keyCode >= 48 && event.keyCode <= 57);
    });
    this.studentForm();
  }

  studentForm() {
    this.stdForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)] ],
      lastName: ['', [Validators.required, Validators.minLength(3)] ],
      enrollmentId: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)] ],
      collegeName: ['', [Validators.required] ],
      branch: ['', [Validators.required] ],
      semester: ['', [Validators.required] ]
    });
  }

  submitStudentData() {
    this.loading = true;
    this.crudService.AddStudent(this.stdForm.value);
    sessionStorage.removeItem('clark');
    setTimeout(() => {
      this.router.navigate(['/dashboard/view-students']);
      this.toastr.success(this.stdForm.controls['firstName'].value + ' added Successfully!');
    }, 2000);
  }
}