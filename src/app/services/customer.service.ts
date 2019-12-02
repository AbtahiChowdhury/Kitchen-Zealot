import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { Customer } from '../interfaces/customer';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';
import { OrderService } from './order.service';
import { BlacklistService } from './blacklist.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerCollection:AngularFirestoreCollection<Customer>;
  customersObservable:Observable<Customer[]>;

  constructor(private afs:AngularFirestore, private userServe:UserService,private authServe:AuthService,private orderServe:OrderService,private blacklist:BlacklistService) 
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
    this.afs.doc("customers/"+uid).update(customer);
  }

  getCustomer(uid:string):Observable<Customer>
  {
    return this.afs.doc("customers/"+uid).valueChanges() as Observable<Customer>;
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

  updateRating(uid:string)
  {
    this.orderServe.ordersObservable.pipe(take(1)).subscribe(orders=>{
      let filteredOrders = orders.filter(o => o.orderedBy == uid);
      let sortedOrders = filteredOrders.sort((a,b)=>a.deliveredOn < b.deliveredOn ? 1 : a.deliveredOn > b.deliveredOn ? -1 : 0);
      let sum = 0;
      let count = 0;
      let average = 5;
      for(let i = 0;i<sortedOrders.length;i++)
      {
        if(sortedOrders[i].customerRating != null)
        {
          count++;
          sum += sortedOrders[i].customerRating;
        }
      }
      if(count == 0)
        average = 0;
      else
        average = sum/count;
      
      uid = uid.trim();
      this.getCustomer(uid).pipe(take(1)).subscribe(customer=>{
        if(sortedOrders.length > 3 && average > 4)
          customer.rank = "VIP";
        if(sortedOrders.length > 3 && average >= 2 && average <= 4)
          customer.rank = "Normal";
        if(sortedOrders.length > 3 && average > 1 && average < 2)
          customer.rank = "Guest";
        if(sortedOrders.length > 3 && average == 1)
        {
          customer.rank = "Blacklist";
          this.userServe.getUser(customer.uid).pipe(take(1)).subscribe(user=>{
            this.blacklist.isOnBlacklist(user.email).pipe(take(1)).subscribe(exists=>{
              if(!exists)
                this.blacklist.addToBlacklist(user.email);
            })
          })
        }
        customer.averageRating = average;
        this.updateCustomer(uid,customer);
      })
    })
  }
}
