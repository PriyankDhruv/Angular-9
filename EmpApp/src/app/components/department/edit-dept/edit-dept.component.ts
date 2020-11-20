import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { DepartmentService } from '../../../services/department/department.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-edit-dept',
  templateUrl: './edit-dept.component.html',
  styleUrls: ['./edit-dept.component.css']
})

export class EditDeptComponent implements OnInit {

  constructor(public dialog: MatDialogRef<EditDeptComponent>, public DeptService: DepartmentService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialog.close();
    this.DeptService.filter('Register Click');
  }

  matcher = new MyErrorStateMatcher();

  onSubmit(form: NgForm) {
    this.DeptService.updateDepartment(form.value)
    .subscribe((res) => {
      this._snackBar.open('Brand updated Successfully!', 'Got it!', {
        verticalPosition: 'bottom',
        duration: 3000
      });
    });

    this.onClose();
  }
}