import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Register } from '../../models/register.model';
import { LoginService } from '../../services/login/login.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  password: boolean = false;
  registerForm: FormGroup;

  data = false;
  message: string;

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService, public _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      Password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(9)]],
      Email: ['', [Validators.required, Validators.email]],
      ContactNo: ['', [Validators.required, Validators.maxLength(12)]],
      Address: ['', [Validators.required, Validators.maxLength(50)]],
      Status: ['', [Validators.required]],
    });
  }

  matcher = new MyErrorStateMatcher();

  createUser(register: Register) {
    this.loginService.CreateUser(register)
    .subscribe((data) => {
        if(data.Status === "Failure") {
          this._snackBar.open(data.Message,
            'Got it!', {
              duration: 3000,
              verticalPosition: 'bottom',
            }
          );
        } else {
          this.data = true;
          this.router.navigate(['/login']);
          this.message = 'Data saved Successfully';
          this.registerForm.reset();
        }
        
      }
    );
  }

  

  register() {
    const user = this.registerForm.value;
    this.createUser(user);
    this._snackBar.open('Registration done Successfully!',
      'Got it!', {
        duration: 3000,
        verticalPosition: 'bottom',
      }
    );
  }
}