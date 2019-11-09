import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.css']
})
export class CustomerNavbarComponent implements OnInit {
  username:string;
  constructor(private authServe:AuthService,private userServe:UserService) { 
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      if(user)
      {
        this.userServe.getUser(user.uid).pipe(take(1)).subscribe(user=>{
          this.username = user.firstName;
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
