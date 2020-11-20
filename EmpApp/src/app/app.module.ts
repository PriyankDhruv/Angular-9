import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddDeptComponent } from './components/department/add-dept/add-dept.component';
import { AddEmpComponent } from './components/employee/add-emp/add-emp.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { DelDeptComponent } from './components/department/del-dept/del-dept.component';
import { DelEmpComponent } from './components/employee/del-emp/del-emp.component';

import { DepartmentComponent } from './components/department/department.component';
import { EmployeeComponent } from './components/employee/employee.component';

import { EditDeptComponent } from './components/department/edit-dept/edit-dept.component';
import { EditEmpComponent } from './components/employee/edit-emp/edit-emp.component';


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { ShowDeptComponent } from './components/department/show-dept/show-dept.component';
import { ShowEmpComponent } from './components/employee/show-emp/show-emp.component';

import { DepartmentService } from './services/department/department.service';
import { EmployeeService } from './services/employee/employee.service';
import { LoginService } from './services/login/login.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from  '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DepartmentComponent,
    RegisterComponent,
    LoginComponent,
    EmployeeComponent,
    AddEmpComponent,
    DelEmpComponent,
    EditEmpComponent,
    ShowEmpComponent,
    AddDeptComponent,
    DelDeptComponent,
    EditDeptComponent,
    ShowDeptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule,
    MatSortModule,
    MatSnackBarModule,
    ShowHidePasswordModule
  ],
  providers: [DepartmentService, EmployeeService, LoginService],
  bootstrap: [AppComponent]
})

export class AppModule { }