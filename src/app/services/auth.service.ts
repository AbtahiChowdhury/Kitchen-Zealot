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
import { GuestService } from './guest.service';
import { Customer } from '../interfaces/customer';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  user$:Observable<firebase.User>;
  error:FirebaseError;
  constructor(private afAuth:AngularFireAuth,private userServe:UserService,private emplServe:EmployeeService,private guestServe:GuestService, public router:Router,private orderServe:OrderService) { 
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

  registerExistingGuest(email:string, password:string,name:string,phone:string)
  {
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(userCredentials=>{
      let tempUser:User = {
        uid:userCredentials.user.uid,
        email:userCredentials.user.email,
        phone:phone,
        name:name,
        type:"customer"
      }
      this.userServe.addUser(tempUser);

      this.guestServe.getGuest(phone).pipe(take(1)).subscribe(guest=>{
        let tempCust:Customer = {
          uid:userCredentials.user.uid,
          shoppingCart:new Array(),
          rank:"Guest",
          paymentDetails:guest.paymentDetails,
          address:guest.address
        }
        this.userServe.addCustomer(tempCust);
        this.guestServe.removeGuest(phone);
      });

      this.orderServe.ordersObservable.pipe(take(1)).subscribe(orders=>{
        for(let order of orders)
        {
          if(order.orderedBy == phone)
          {
            order.orderedBy = tempUser.uid;
            this.orderServe.updateOrder(order.uid,order);
          }
        }
      })
      this.router.navigateByUrl("/customer");
    });
    //this.afAuth.auth.currentUser.sendEmailVerification();
  }

  registerNewGuest(email:string, password:string,name:string,phone:string)
  {
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(userCredentials=>{
      let tempUser:User = {
        uid:userCredentials.user.uid,
        email:userCredentials.user.email,
        phone:phone,
        name:name,
        type:"customer"
      }

      let tempCust:Customer = {
        uid:userCredentials.user.uid,
        shoppingCart:new Array(),
        rank:"Guest"
      }
      this.userServe.addUser(tempUser);
      this.userServe.addCustomer(tempCust);
      this.router.navigateByUrl("/customer");
    });
    //this.afAuth.auth.currentUser.sendEmailVerification();
  }

  logout()
  {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl("");
  }

  guestLogin()
  {
    this.afAuth.auth.signInAnonymously().then(guestCredentials=>{
      this.router.navigateByUrl("/guest");
    });
  }

}
