import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

import { Employee } from '../../models/employee.model';
import { ApiService } from '../../services/CRUD/api.service';

import { DeleteEmpComponent } from '../delete-emp/delete-emp.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})

export class EmpListComponent implements OnInit {
  employee: Employee[] = [];
  employees: MatTableDataSource<any>;
  
  isLoading = true;
  displayedColumns: string[] = ['Name', 'Email', 'Brand', 'Designation', 'DOJ', 'PhoneNumber', 'Options'];
  pageSizeOptions: number[] = [2, 4, 6, 10];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: ApiService, private dialog: MatDialog, public overlay: Overlay, private router: Router, 
    public toastr: ToastrService) { 
    this.apiService.listen()
    .subscribe(x => {
      console.log(x);
      this.readEmployees();
    });
  }

  ngOnInit() { 
    this.readEmployees();
  }

  readEmployees() {
    this.apiService.getEmployees().pipe(delay(2000)).subscribe((data: Employee[]) => {
      this.isLoading = false
      this.employees = new MatTableDataSource(data);
      this.employees.sort = this.sort;
      this.employees.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.employees.filter = filterValue.trim().toLocaleLowerCase();
  }

  editEmployee(employee: Employee) {
    sessionStorage.setItem('clark', 'kent');
    this.router.navigate(['/edit-employee', employee._id]);
  }

  removeEmployee(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "550px";
    dialogConfig.height = "200px";
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    let dialogRef = this.dialog.open(DeleteEmpComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.readEmployees();
          this.toastr.success(employee.name + ' removed Successfully!');
        });
      }
    });
  }
}