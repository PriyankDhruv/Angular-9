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

import { AddDeptComponent } from '../add-dept/add-dept.component';
import { EditDeptComponent } from '../edit-dept/edit-dept.component';
import { DelDeptComponent } from '../del-dept/del-dept.component';

import { Department } from '../../../models/department.model';
import { DepartmentService } from '../../../services/department/department.service';

@Component({
  selector: 'app-show-dept',
  templateUrl: './show-dept.component.html',
  styleUrls: ['./show-dept.component.css']
})

export class ShowDeptComponent implements OnInit {
  public listData = new MatTableDataSource<any>();
  displayedColumns: string[] = ['DepartmentID', 'DepartmentName', 'Options'];
  pageSizeOptions: number[] = [2, 4, 6, 10];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  constructor(private DeptService: DepartmentService, private dialog: MatDialog, public overlay: Overlay, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.RefreshDeptList();
  }

  RefreshDeptList() {
    this.DeptService.getDepartmentList()
    .subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLocaleLowerCase();
  }

  onAddDept() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    let dialogRef = this.dialog.open(AddDeptComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(x => {
      this.RefreshDeptList();
    })
  }

  onEditDept(dept: Department) {
    this.DeptService.formData = dept;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "550px";
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    let dialogRef = this.dialog.open(EditDeptComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(y => {
      this.RefreshDeptList();
    });
  }

  onDelDept(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "550px";
    dialogConfig.height = "200px";
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    let dialogRef = this.dialog.open(DelDeptComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.DeptService.deleteDepartment(id)
        .subscribe((res) => {
          this.RefreshDeptList();
          this._snackBar.open('Brand removed Successfully!', 'Got it!', {
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
      pdf.save('brandData.pdf');    
    });   
  }

  exportToExcel() {
    const workSheet = xlsx.utils.json_to_sheet(this.listData.data);
    const workBook: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    xlsx.writeFile(workBook, 'brandData.ods');
  }
}