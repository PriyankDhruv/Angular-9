import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Login } from '../../models/login.model';
import { LoginService } from '../../services/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  password: boolean = false;
  loginForm: FormGroup;

  x: Login[];
  errorMessage: string;

  hide = true;
  constructor(private router: Router, private loginService: LoginService, private fb: FormBuilder, public _snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      UserName: [null, [Validators.required]],
      Password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
    });

    sessionStorage.removeItem('UserName');
    sessionStorage.clear();
  }

  matcher = new MyErrorStateMatcher();

  validateUser(login: Login) {
    this.loginService.Login(login)
    .subscribe(data => {
      if(data.Status === "Success") {
        sessionStorage.setItem('Ethan', 'Hunt');
        this.router.navigate(['/dashboard']);
        this._snackBar.open('You login Successfully!', 'Got it!', {
          verticalPosition: 'bottom',
          duration: 3000
        });
      } else {
        this._snackBar.open('Invalid username or password!', 'try again!', {
          verticalPosition: 'bottom',
          duration: 3000
        });
      }
    },
    error => {
      this.errorMessage = error.message;
    });
  }
  
  login() {
    const logger = this.loginForm.value;
    this.validateUser(logger);
  }
}