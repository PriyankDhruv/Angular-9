import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  endpointUrl: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private _listener = new Subject<any>();

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get(`${this.endpointUrl}`);
  }

  getEmployee(id: any): Observable<Employee> {
    let url = `${this.endpointUrl}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }).bind(
        catchError(this.errorMgmt)
      )
    );
  }

  createEmployee(data: {}): Observable<Employee> {
    let url = `${this.endpointUrl}/create`;
    return this.http.post(url, data).pipe(
      map(
        (response: Response) => { const result = response.json(); return result; }
      )
      .bind(
        catchError(this.errorMgmt)
      )
    );
  }

  updateEmployee(id: any, data: {}): Observable<Employee> {
    let url = `${this.endpointUrl}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }).bind(
        catchError(this.errorMgmt)
      )
    );
  }

  deleteEmployee(id: any): Observable<any> {
    let url = `${this.endpointUrl}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  listen(): Observable<any>{
    return this._listener.asObservable();
  }

  filter(filterBy: string) {
    this._listener.next(filterBy);
  }
}