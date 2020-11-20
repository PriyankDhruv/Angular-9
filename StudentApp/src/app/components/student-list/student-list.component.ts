import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Overlay } from '@angular/cdk/overlay';
import { DelStudentComponent } from '../del-student/del-student.component';

import { Student } from '../../models/student';
import { CrudService } from '../../services/CRUD/crud.service';
import { ToastrService } from 'ngx-toastr';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  loading = false;
  std: Student[] = [];
  student: MatTableDataSource<any>;

  displayedColumns: string[] = ['StudentID', 'FirstName', 'LastName', 'EnrollmentNo.', 'CollegeName', 'Branch', 'Semester', 'Options'];
  pageSizeOptions: number[] = [2, 4, 6, 10];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public crudService: CrudService, private dialog: MatDialog, public overlay: Overlay, 
    private router: Router, public toastr: ToastrService) { }

  ngOnInit() {
    let s = this.crudService.GetStudentsList();
    s.snapshotChanges().subscribe(data => {
      this.std = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.std.push(a as Student);
      });
      this.RefreshStudentList(this.std);
    });
  }

  RefreshStudentList(std: Student[]) {
    this.student = new MatTableDataSource(std);
    this.student.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.student.filter = filterValue.trim().toLocaleLowerCase();
  }

  deleteStudent(student: Student) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "550px";
    dialogConfig.height = "200px";
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    let dialogRef = this.dialog.open(DelStudentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.crudService.DeleteStudent(student.$key);
        this.toastr.success(student.firstName + ' removed Successfully!');
      }
    });
  }

  navigateToAddStudent() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/register-student']);
    }, 2000);
  }

  navigateToEditStudent(student: Student) {
    sessionStorage.setItem('clark', 'kent');
    this.router.navigate(['/edit-student/' + student.$key]);
  }
}