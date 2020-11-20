import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Overlay } from '@angular/cdk/overlay';

import * as jsPDF from 'jspdf';
import * as xlsx from 'xlsx';
import html2canvas from 'html2canvas';

import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { DelEmpComponent } from '../del-emp/del-emp.component';

import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../../../services/employee/employee.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})

export class ShowEmpComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ', 'Address', 'Phone', 'Salary', 'Age', 'Options'];
  pageSizeOptions: number[] = [2, 4, 6, 10];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  constructor(private EmpService: EmployeeService, private dialog: MatDialog, public overlay: Overlay, private _snackBar: MatSnackBar) { 
    this.EmpService.listen()
    .subscribe(x => { 
      console.log(x);
      this.RefreshEmpList();
    });
  }

  ngOnInit() {
    this.RefreshEmpList();
  }

  RefreshEmpList() {
    this.EmpService.getEmployeeList()
    .subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLocaleLowerCase();
  }

  onAddEmp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    let dialogRef = this.dialog.open(AddEmpComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(x => {
      this.RefreshEmpList();
    });
  }

  onEditEmp(emp: Employee) {
    this.EmpService.formData = emp;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    let dialogRef = this.dialog.open(EditEmpComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(y => {
      this.RefreshEmpList();
    });
  }

  onDelEmp(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "550px";
    dialogConfig.height = "200px";
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    let dialogRef = this.dialog.open(DelEmpComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.EmpService.deleteEmployee(id)
        .subscribe((res) => {
          this.RefreshEmpList();
          this._snackBar.open('Employee removed Successfully!', 'Got it!', {
            verticalPosition: 'bottom',
            duration: 3000
          });
        });
      }
    });
  }

  public downloadPDF(): void {
    var data = document.getElementById('pdfTable');
    html2canvas(data).then(canvas => {  
      var imgWidth = 208;   
      var imgHeight = canvas.height * imgWidth / canvas.width;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4');  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('empData.pdf');    
    });   
  }

  exportToExcel() {
    const workSheet = xlsx.utils.json_to_sheet(this.listData.data);
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    xlsx.writeFile(workBook, 'empData.ods');
  }
}