import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';
import { UserService } from './user.service';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeCollection: AngularFirestoreCollection<Employee>;
  employeesObservable: Observable<Employee[]>;

  constructor(private afs:AngularFirestore, private userServe:UserService) { 
    this.employeeCollection = this.afs.collection('employees', ref => ref.orderBy("position","asc"));
    this.employeesObservable = this.employeeCollection.valueChanges({idfield:"uid"});
  }

  addEmployee(employee:Employee)
  {
    this.employeeCollection.doc(employee.uid).set(employee);
  }

  removeEmployee(employee:Employee)
  {
    this.afs.doc("employees/" + employee.uid).delete();
  }

  getEmployee(uid:string):Observable<Employee>
  {
    return this.afs.doc("employees/" + uid).valueChanges() as Observable<Employee>;
  }

  getUser(uid:string):Observable<User>
  {
    return this.userServe.getUser(uid);
  }
}
