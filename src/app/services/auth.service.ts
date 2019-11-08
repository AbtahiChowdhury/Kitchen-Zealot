import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { take } from 'rxjs/operators';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  user$:Observable<firebase.User>;
  constructor(private afAuth:AngularFireAuth,private userServe:UserService,private router:Router) { 
    this.user$ = afAuth.authState;
  }

  login(email:string, password:string)
  {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(userCredentials=>{
      this.user$.pipe(take(1)).subscribe(user=>{
        this.userServe.getUser(user.uid).pipe(take(1)).subscribe(user=>{
          this.router.navigateByUrl("/" + user.type);
        })
      })
    });
  }

  register(email:string, password:string)
  {
    this.afAuth.auth.createUserWithEmailAndPassword(email,password);
    //this.afAuth.auth.currentUser.sendEmailVerification();
  }

  logout()
  {
    this.afAuth.auth.signOut();
  }
}
