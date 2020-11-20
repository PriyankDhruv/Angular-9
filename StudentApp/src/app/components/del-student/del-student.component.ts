import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-del-student',
  templateUrl: './del-student.component.html',
  styleUrls: ['./del-student.component.css']
})

export class DelStudentComponent implements OnInit {
  loading = false;
  canceling = false;
  confirmMsg: string = 'Are you sure you want to Remove this Student Info?';

  constructor(public dialogRef: MatDialogRef<DelStudentComponent>) { }

  ngOnInit() { }

  onLoad() {
    this.loading = true;
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 2000);
  }

  onCancel() {
    this.canceling = true;
    setTimeout(() => {
      this.dialogRef.close(false);
    }, 2000);
  }
}