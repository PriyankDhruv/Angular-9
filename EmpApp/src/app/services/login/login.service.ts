import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Login } from '../../models/login.model';
import { Register } from '../../models/register.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  Url: string;  
  token: string;  
  header: any;  

  constructor(private http: HttpClient) { 
    this.Url = 'http://localhost:58949/Api/Login';
    const headerSettings: { [name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);
  }

  Login(login: Login) {
    const httpOptions = { headers: this.header };  
    return this.http.post<any>(this.Url + '/UserLogin', login, httpOptions);  
  }

  CreateUser(register: Register) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
    return this.http.post<any>(this.Url + '/UserRegistration', register, httpOptions);
  }
}