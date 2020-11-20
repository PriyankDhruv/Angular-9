import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del-emp',
  templateUrl: './del-emp.component.html',
  styleUrls: ['./del-emp.component.css']
})

export class DelEmpComponent implements OnInit {
  confirmMsg: string = 'Are you sure you want to Remove this Employee Info?';

  constructor(public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<DelEmpComponent>) { }

  ngOnInit() { }
}