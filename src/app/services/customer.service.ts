import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Customer } from '../interfaces/customer';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerCollection:AngularFirestoreCollection<Customer>;
  customersObservable:Observable<Customer[]>;

  constructor(private afs:AngularFirestore, private userServe:UserService,private authServe:AuthService) 
  { 
    this.customerCollection = this.afs.collection('customers');
    this.customersObservable = this.customerCollection.valueChanges({idfield:"uid"});
  }

  addCustomer(customer:Customer)
  {
    this.customerCollection.doc(customer.uid).set(customer);
  }

  removeCustomer(customer:Customer)
  {
    this.afs.doc("customers/" + customer.uid).delete();
  }

  updateCustomer(uid:string,customer:Customer)
  {
    this.afs.doc("customers/" + uid).update(customer);
  }

  getCustomer(uid:string):Observable<Customer>
  {
    return this.afs.doc("customers/" + uid).valueChanges() as Observable<Customer>;
  }

  getUser(uid:string):Observable<User>
  {
    return this.userServe.getUser(uid);
  }

  getCurrentUser()
  {
    return this.authServe.user$.pipe(switchMap(user=>{
      return this.getUser(user.uid);
    }));
  }

  getCurrentCustomer()
  {
    return this.authServe.user$.pipe(switchMap(user=>{
      return this.getCustomer(user.uid)
    }));
  }
}
