import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  isloginSucceeded: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('Ethan')) {
      this.router.navigate(['/login']);
    }
  }

  redirectToLogin() {
    sessionStorage.removeItem('Ethan');
    this.router.navigate(['/login']);
  }
}