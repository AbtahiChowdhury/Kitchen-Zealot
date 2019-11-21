import { Injectable } from '@angular/core';
import { auth, FirebaseError } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { User } from '../interfaces/user';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  user$:Observable<firebase.User>;
  error:FirebaseError;
  constructor(private afAuth:AngularFireAuth,private userServe:UserService,private emplServe:EmployeeService,public router:Router) { 
    this.user$ = afAuth.authState;
  }

  login(email:string, password:string)
  {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(userCredentials=>{
      this.user$.pipe(take(1)).subscribe(user=>{
        this.userServe.getUser(user.uid).pipe(take(1)).subscribe(user=>{
          if(user.type=="customer")
          {
            this.router.navigateByUrl("/" + user.type);
          }
          else
          {
            this.emplServe.getEmployee(user.uid).pipe(take(1)).subscribe(employee=>{
              this.router.navigateByUrl("/" + employee.position);
            })
          }
        })
      })
    }).catch(error=>{this.error = error});
  }

  register(email:string, password:string)
  {
    this.afAuth.auth.createUserWithEmailAndPassword(email,password);
    //this.afAuth.auth.currentUser.sendEmailVerification();
  }

  logout()
  {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl("");
  }

  guestLogin(formValue)
  {
    this.afAuth.auth.signInAnonymously().then(guestCredentials=>{
      this.router.navigateByUrl("/guest");
    });
  }

}
