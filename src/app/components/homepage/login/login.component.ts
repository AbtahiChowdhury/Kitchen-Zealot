import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error;
  constructor(private authServe:AuthService) { }

  ngOnInit() {
  }

  login(form)
  {
    this.authServe.login(form.email, form.password);
  }

}
