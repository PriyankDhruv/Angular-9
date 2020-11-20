import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Student } from '../../models/student';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  private _listener = new Subject<any>();
  studentsRef: AngularFireList<any>;
  studentRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  AddStudent(student: Student) {
    this.studentsRef.push({
      firstName: student.firstName,
      lastName: student.lastName,
      enrollmentId: student.enrollmentId,
      collegeName: student.collegeName,
      branch: student.branch,
      semester: student.semester
    });
  }

  GetStudent(id: string) {
    this.studentRef = this.db.object('student-list/' + id);
    return this.studentRef;
  }

  GetStudentsList() {
    this.studentsRef = this.db.list('student-list');
    return this.studentsRef;
  }

  UpdateStudent(student: Student) {
    this.studentRef.update({
      firstName: student.firstName,
      lastName: student.lastName,
      enrollmentId: student.enrollmentId,
      collegeName: student.collegeName,
      branch: student.branch,
      semester: student.semester
    });
  }

  DeleteStudent(id: string) {
    this.studentRef = this.db.object('student-list/' + id);
    this.studentRef.remove();
  }

  listen(): Observable<any>{
    return this._listener.asObservable();
  }

  filter(filterBy: string) {
    this._listener.next(filterBy);
  }
}