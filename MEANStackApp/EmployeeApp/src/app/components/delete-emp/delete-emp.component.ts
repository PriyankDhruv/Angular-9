import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-emp',
  templateUrl: './delete-emp.component.html',
  styleUrls: ['./delete-emp.component.css']
})

export class DeleteEmpComponent implements OnInit {
  loading = false;
  canceling = false;
  confirmMsg: string = 'Are you sure you want to Remove this Employee Info?';

  constructor(public dialogRef: MatDialogRef<DeleteEmpComponent>) { }

  ngOnInit() {}

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