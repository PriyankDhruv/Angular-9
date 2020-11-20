import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, FormControl, FormGroupDirective } from '@angular/forms';

import { DepartmentService } from '../../../services/department/department.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-add-dept',
  templateUrl: './add-dept.component.html',
  styleUrls: ['./add-dept.component.css']
})

export class AddDeptComponent implements OnInit {
  constructor(public dialog: MatDialogRef<AddDeptComponent>, public DeptService: DepartmentService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.resetForm();
  }

  onClose() {
    this.dialog.close();
    this.DeptService.filter('Register Click');
  }

  resetForm(form?: NgForm) {
    if(form != null) {
      form.resetForm();
    }

    this.DeptService.formData = {
      DepartmentID: 0,
      DepartmentName: ''
    }
  }

  matcher = new MyErrorStateMatcher();

  onSubmit(form: NgForm) {
    this.DeptService.addDepartment(form.value)
    .subscribe((res) => {
      this.resetForm();
      this._snackBar.open('Brand added Successfully!', 'Got it!', {
        verticalPosition: 'bottom',
        duration: 3000
      });
    });

    this.onClose();
  }
}