import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'salesperson-navbar',
  templateUrl: './salesperson-navbar.component.html',
  styleUrls: ['./salesperson-navbar.component.css']
})
export class SalespersonNavbarComponent implements OnInit {
  username:string;
  constructor(private authServe:AuthService,private userServe:UserService) 
  { 
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      if(user)
      {
        this.userServe.getUser(user.uid).pipe(take(1)).subscribe(user=>{
          this.username = user.name;
        })
      }
      else
      {
        this.username="Username";
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
