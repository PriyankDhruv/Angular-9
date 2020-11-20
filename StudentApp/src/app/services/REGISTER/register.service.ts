import { Injectable } from '@angular/core';
import { Register } from '../../models/register';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  regStudsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { 
  }

  RegisterStudent(register: Register) {
    this.regStudsRef.push({
      userName: register.userName,
      email: register.email,
      password: register.password,
      phoneNumber: register.phoneNumber
    });
  }

  GetUsersList() {
    this.regStudsRef = this.db.list('user-list');
    return this.regStudsRef;
  }
}