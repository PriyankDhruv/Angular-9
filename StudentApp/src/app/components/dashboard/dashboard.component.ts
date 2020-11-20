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
  LoaderZ = false;

  constructor(private router: Router) { }

  ngOnInit() { 
    if(!sessionStorage.getItem('priyank')) {
      this.router.navigate(['/login']);
    }
  }

  redirectToStudList() {
    this.LoaderX = true;
    setTimeout(() => {
      this.LoaderX = false;
    }, 2000);
    setTimeout(() => {
      this.router.navigate(['/dashboard/view-students']);
    }, 2000);
  }

  redirectToAddStud() {
    this.LoaderY = true;
    setTimeout(() => {
      sessionStorage.setItem('clark', 'kent');
      this.router.navigate(['/register-student']);
    }, 2000);
  }

  redirectToLogin() {
    this.LoaderZ = true;
    setTimeout(() => {
      sessionStorage.removeItem('priyank');
      this.router.navigate(['/login']);
    }, 2000);
  }
}