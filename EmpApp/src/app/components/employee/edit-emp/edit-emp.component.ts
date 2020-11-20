import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import * as $ from 'jquery';
import { EmployeeService } from '../../../services/employee/employee.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})

export class EditEmpComponent implements OnInit {
  public deptList: Array<string> = [];
  
  constructor(public dialog: MatDialogRef<EditEmpComponent>, public EmpService: EmployeeService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
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

  deptDropDown() {
    this.EmpService.GetDeptDropDownValues()
    .subscribe(data => {
      data.forEach(element => {
        this.deptList.push(element['DepartmentName']);
      });
    });
  }

  matcher = new MyErrorStateMatcher();
  
  onSubmit(form: NgForm) {
    this.EmpService.updateEmployee(form.value)
    .subscribe((res) => {
      this._snackBar.open('Employee updated Successfully!', 'Got it!', {
        verticalPosition: 'bottom',
        duration: 3000
      });
    });

    this.onClose();
  }
}