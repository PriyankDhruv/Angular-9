import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  LoaderX = false;
  LoaderY = false;

  constructor(private router: Router) { 

  }

  ngOnInit() {
  }

  redirectToEmpList() {
    this.router.navigate(['/dashboard/employee-list']);
  }

  redirectToAddEmp() {
    this.LoaderX = true;
    setTimeout(() => {
      this.router.navigate(['/create-employee']);
    }, 2000); 
  }

}
