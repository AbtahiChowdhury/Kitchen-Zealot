import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cook-navbar',
  templateUrl: './cook-navbar.component.html',
  styleUrls: ['./cook-navbar.component.css']
})
export class CookNavbarComponent implements OnInit {

  username:string;
  constructor(private authServe:AuthService, private emplServe:EmployeeService) 
  { 
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      if(user)
      {
        this.emplServe.getUser(user.uid).pipe(take(1)).subscribe(employee=>{
          this.username = employee.name;
        })
      }
      else
      {
        this.username = "Username";
      }
    })
  }

  signOut()
  {
    this.authServe.logout();
  }

  ngOnInit() {
  }

}
