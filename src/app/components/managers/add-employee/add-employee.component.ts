import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private authServe:AuthService) { }

  ngOnInit() {
  }

  add(formValue)
  {
    this.authServe.registerEmployee(formValue);
    this.authServe.router.navigateByUrl("/manager/employees");
  }

}
