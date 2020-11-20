import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del-dept',
  templateUrl: './del-dept.component.html',
  styleUrls: ['./del-dept.component.css']
})

export class DelDeptComponent implements OnInit {
  confirmMsg: string = 'Are you sure you want to Remove this Brand?';

  constructor(public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<DelDeptComponent>) { }

  ngOnInit() {
  }
}