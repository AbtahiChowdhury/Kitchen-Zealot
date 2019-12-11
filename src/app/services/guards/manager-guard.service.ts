import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../employee.service';
import { CanActivate } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuardService implements CanActivate {

  constructor(private authServe:AuthService,private emplServe:EmployeeService) { 

  }

  canActivate()
  {
    return this.authServe.user$
    .pipe(switchMap(user => this.emplServe.getEmployee(user.uid)))
    .pipe(map(employee=>{
      if(employee.position == "manager")
        return true;
      return false;
    }));
  }
}
