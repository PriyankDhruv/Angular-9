import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { CreateEmpComponent } from './components/create-emp/create-emp.component';
import { EditEmpComponent } from './components/edit-emp/edit-emp.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'employee-list', component: EmpListComponent },
    ]
  },
  { path: 'create-employee', component: CreateEmpComponent },
  { path: 'edit-employee/:id', component: EditEmpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
