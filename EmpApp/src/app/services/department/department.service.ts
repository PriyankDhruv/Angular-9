import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Department } from '../../models/department.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  formData: Department;
  private _listener = new Subject<any>();
  readonly APIUrl = 'http://localhost:58949//Api/Department';

  constructor(private http: HttpClient) { }

  getDepartmentList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.APIUrl + '/AllDepartments');
  }

  getSingleDepartment(id: number): Observable<Department[]> {
    return this.http.get<Department[]>(this.APIUrl + '/GetDepartmentsById' + id);
  }

  addDepartment(dept: Department) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.post(this.APIUrl + '/InsertDepartments', dept, httpOptions);
  }

  updateDepartment(dept: Department) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.put(this.APIUrl + '/UpdateDepartments', dept, httpOptions);
  }

  deleteDepartment(id: number) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.http.delete(this.APIUrl + '/DeleteDepartments?id=' + id, httpOptions);
  }

  listen(): Observable<any>{
    return this._listener.asObservable();
  }

  filter(filterBy: string) {
    this._listener.next(filterBy);
  }
}