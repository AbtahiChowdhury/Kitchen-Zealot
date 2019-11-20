import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { EmployeeService } from './employee.service';
import { User } from '../interfaces/user';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class AddNewAuthService {

  constructor(private userServe:UserService,private emplServe:EmployeeService) { }

  addNewEmployee(formValue)
  {
    let secondaryApp = firebase.initializeApp(environment.firebase,"Secondary");
    secondaryApp.auth().createUserWithEmailAndPassword(formValue.email,"123456").then(userCredentials=>{
      let tempUser:User = {uid:userCredentials.user.uid,email:userCredentials.user.email,phone:formValue.phone,name:formValue.name,type:"employee"};
      this.userServe.addUser(tempUser);
      let tempEmployee:Employee = {uid:userCredentials.user.uid,position:formValue.position,salary:formValue.salary};
      this.emplServe.addEmployee(tempEmployee);
      secondaryApp.auth().signOut();
    });
  }
}
