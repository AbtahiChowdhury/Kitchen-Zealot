import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { take } from 'rxjs/operators';
import { BlacklistService } from 'src/app/services/blacklist.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit 
{
  uid:string;
  userName:string;
  employeePosition:string;
  employeeSalary:number;
  userEmail:string;
  employeeWarnings:number;
  employeeActive:boolean;
  employeeAverageRating:number;
  userPhone:string;
  dropCount:number;
  constructor(private aRoute:ActivatedRoute,private router:Router,private emplServe:EmployeeService,private blacklist:BlacklistService) 
  {
    this.uid = this.aRoute.snapshot.paramMap.get("uid");
    this.emplServe.getEmployee(this.uid).pipe(take(1)).subscribe(employee=>{
      this.employeePosition = employee.position;
      this.employeeSalary = employee.salary;
      this.employeeActive = employee.active;
      this.employeeAverageRating = employee.averageRating? employee.averageRating : null;
      this.employeeWarnings = employee.warningCount ? employee.warningCount : 0;
      this.dropCount = employee.dropCount? employee.dropCount : null;
    })

    this.emplServe.getUser(this.uid).pipe(take(1)).subscribe(user=>{
      this.userName = user.name;
      this.userEmail = user.email;
      this.userPhone = user.phone;
    })
  }

  ngOnInit() {
  }

  update(formValue)
  {
    let tempEmployee = {
      uid:this.uid,
      position:formValue.position,
      salary:formValue.salary,
      active:formValue.active,
      averageRating:this.employeeAverageRating,
      warningCount:formValue.warnings,
      dropCount:this.dropCount
    }

    this.blacklist.isOnBlacklist(this.userEmail).pipe(take(1)).subscribe(exists=>{
      if(exists && tempEmployee.active)
      {
        this.blacklist.removeFromBlacklist(this.userEmail);
      }
      else
      {
        if(!exists && !tempEmployee.active)
        {
          this.blacklist.addToBlacklist(this.userEmail);
        }
      }
    })

    this.emplServe.updateEmployee(this.uid,tempEmployee);
    this.router.navigateByUrl("/manager/employees");
  }

}
