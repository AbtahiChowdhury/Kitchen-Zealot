import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GuestService } from 'src/app/services/guest.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'guest-navbar',
  templateUrl: './guest-navbar.component.html',
  styleUrls: ['./guest-navbar.component.css']
})
export class GuestNavbarComponent implements OnInit 
{
  name:string = "Guest";
  constructor(private authServe:AuthService,private guestServe:GuestService) 
  { 
  }

  signOut()
  {
    this.authServe.logout();
  }

  ngOnInit() {
  }

}
