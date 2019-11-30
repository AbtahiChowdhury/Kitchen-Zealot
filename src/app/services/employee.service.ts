import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';
import { UserService } from './user.service';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeCollection: AngularFirestoreCollection<Employee>;
  employeesObservable: Observable<Employee[]>;

  constructor(private afs:AngularFirestore, private userServe:UserService,private orderServe:OrderService) { 
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

  updateEmployee(uid:string,employee:Employee)
  {
    this.afs.doc("employees/"+uid).update(employee);
  }

  updateAverageDeliveryRating(uid:string)
  {
    this.orderServe.ordersObservable.pipe(take(1)).subscribe(orders=>{
      let filteredOrders = orders.filter(o => o.deliveredBy == uid);
      let sortedOrders = filteredOrders.sort((a,b)=>a.deliveredOn < b.deliveredOn ? 1 : a.deliveredOn > b.deliveredOn ? -1 : 0);
      let sum = 0;
      let count = 0;
      let average = 5;
      if(sortedOrders.length < 3)
      {
        for(let i = 0;i<sortedOrders.length;i++)
        {
          if(sortedOrders[i].deliveryRating != null)
          {
            count++;
            sum += sortedOrders[i].deliveryRating;
          }
        }
      }
      else
      {
        for(let i = 0;i<3;i++)
        {
          if(sortedOrders[i].deliveryRating != null)
          {
            count++;
            sum += sortedOrders[i].deliveryRating;
          }
        }
      }

      if(count == 0)
        average = 0;
      else
        average = sum/count;

      this.getEmployee(uid).pipe(take(1)).subscribe(employee=>{
        employee.averageRating = average;
        if(average >= 1 && average < 2)
          employee.warningCount = employee.warningCount?employee.warningCount+1:1;
        if(employee.warningCount > 3)
          employee.active = false;
        this.updateEmployee(uid,employee);
      })
    })
    
  }
}
