import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Department } from '../../models/department.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  formData: Employee;
  private _listener = new Subject<any>();
  readonly APIUrl = 'http://localhost:58949/Api/Employee';

  constructor(private http: HttpClient) { }

  getEmployeeList(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl + '/AllEmployees');
  }

  getSingleEmployee(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.APIUrl + '/GetEmployeesById/' + id); 
  }

  addEmployee(emp: Employee) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.APIUrl + '/InsertEmployees', emp, httpOptions);
  }

  updateEmployee(emp: Employee) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.APIUrl + '/UpdateEmployees', emp, httpOptions);
  }

  deleteEmployee(id: number) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete(this.APIUrl + '/DeleteEmployees?id=' + id, httpOptions);
  }

  GetDeptDropDownValues() {
    return this.http.get<Department[]>(this.APIUrl + '/Department');
  }

  listen(): Observable<any>{
    return this._listener.asObservable();
  }

  filter(filterBy: string) {
    this._listener.next(filterBy);
  }
}