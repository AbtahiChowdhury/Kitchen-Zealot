import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeCollection: AngularFirestoreCollection<Employee>;
  employeesObservable: Observable<Employee[]>;

  constructor(private afs:AngularFirestore) { 
    this.employeeCollection = this.afs.collection('employees');
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
}
