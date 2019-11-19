import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/employee';
import { take } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeesArr:[Employee,User][] = new Array();
  constructor(private emplServe:EmployeeService) { 
    this.emplServe.employeesObservable.pipe(take(1)).subscribe(employees=>{
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

}
