import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { GuestService } from 'src/app/services/guest.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authServe:AuthService,private router:Router,private guestServe:GuestService) { }

  ngOnInit() {
  }

  register(form)
  {
    this.guestServe.checkIfGuestExists(form.phone).pipe(take(1)).subscribe(exists=>{
      if(exists)
        this.authServe.registerExistingGuest(form.email,form.password,form.name,form.phone);
      else
        this.authServe.registerNewGuest(form.email,form.password,form.name,form.phone);
    })
  }

}
