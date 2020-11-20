import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, FormControl, FormGroupDirective } from '@angular/forms';

import * as $ from 'jquery';
import { EmployeeService } from '../../../services/employee/employee.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})

export class AddEmpComponent implements OnInit {
  public deptList: Array<string> = [];

  constructor(public dialog: MatDialogRef<AddEmpComponent>, public EmpService: EmployeeService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.resetForm();
    this.deptDropDown();

    $(document).ready(function() {
      $('#validateNo').keypress(function (event) {
        return event.keyCode < 32 || (event.keyCode >= 48 && event.keyCode <= 57);
      });
    });
  }

  onClose() {
    this.dialog.close();
    this.EmpService.filter('Register Click');
  }

  resetForm(form?: NgForm) {
    if(form != null) {
      form.resetForm();
    }

    this.EmpService.formData = {
      EmployeeID: 0,
      EmployeeName: '',
      Department: '',
      MailID: '',
      DOJ: null,
      Address: '',
      Phone: null,
      Age: 0,
      Salary: null
    }
  }

  deptDropDown() {
    this.EmpService.GetDeptDropDownValues()
    .subscribe(data => {
      data.forEach(element => {
        this.deptList.push(element['DepartmentName']);
      });
    });
  }

  matcher = new ErrorStateMatcher();

  onSubmit(form: NgForm) {
    this.EmpService.addEmployee(form.value)
    .subscribe((res) => {
      this.resetForm();
      this._snackBar.open('Employee added Successfully!', 'Got it!', {
        verticalPosition: 'bottom',
        duration: 3000
      });
    });

    this.onClose();
  }
}