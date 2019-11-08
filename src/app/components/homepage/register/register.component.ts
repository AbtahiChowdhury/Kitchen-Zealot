import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authServe:AuthService,private router:Router) { }

  ngOnInit() {
  }

  register(form)
  {
    this.authServe.register(form.email,form.password);
    this.router.navigateByUrl("");
  }

}
