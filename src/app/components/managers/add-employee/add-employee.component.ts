import { Component, OnInit } from '@angular/core';
import { AddNewAuthService } from 'src/app/services/add-new-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private addNewAuthServe:AddNewAuthService,private router:Router) { }

  ngOnInit() {
  }

  add(formValue)
  {
    this.addNewAuthServe.addNewEmployee(formValue);
    this.router.navigateByUrl("/manager/employees");
  }

}
