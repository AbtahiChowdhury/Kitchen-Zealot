import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/employee';
import { take } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit,OnDestroy {

  employeesArr:[Employee,User][] = new Array();
  subscription:Subscription;
  constructor(private emplServe:EmployeeService) 
  { 
    this.subscription = this.emplServe.employeesObservable.subscribe(employees=>{
        this.employeesArr = [];
      for(let employee of employees)
      {
        this.emplServe.getUser(employee.uid).pipe(take(1)).subscribe(user=>{
          if(employee.position != "manager")
          {
            this.employeesArr.push([employee,user]);
          }
        })
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
