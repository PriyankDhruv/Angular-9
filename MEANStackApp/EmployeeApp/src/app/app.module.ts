import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { CreateEmpComponent } from './components/create-emp/create-emp.component';
import { EditEmpComponent } from './components/edit-emp/edit-emp.component';
import { DeleteEmpComponent } from './components/delete-emp/delete-emp.component';

import { AlignBtnDirective } from './directives/Button/align-btn.directive';
import { AlignLogoDirective } from './directives/Title/align-logo.directive';
import { FlexDirective } from './directives/Horizon/flex.directive';
import { AlignListDirective } from './directives/EmpList/align-list.directive';
import { AlignFabDirective } from './directives/Matfab/align-fab.directive';
import { AlignCardDirective } from './directives/Card/align-card.directive';

import { ApiService } from './services/CRUD/api.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ShortenPipe } from './pipes/ShortenPipe/shorten.pipe';
import { AlignItemsDirective } from './directives/Menu/align-items.directive';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmpComponent,
    DashboardComponent,
    DeleteEmpComponent,
    EditEmpComponent,
    EmpListComponent,
    AlignBtnDirective,
    AlignCardDirective,
    AlignFabDirective,
    AlignListDirective,
    AlignLogoDirective,
    FlexDirective,
    ShortenPipe,
    AlignItemsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ToastrModule.forRoot()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})

export class AppModule { }