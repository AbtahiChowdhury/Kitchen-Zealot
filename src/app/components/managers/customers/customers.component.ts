import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customersArr:[Customer,User][] = new Array();
  subscription:Subscription;
  constructor(private custServe:CustomerService) 
  { 
    this.subscription = this.custServe.customersObservable.subscribe(customers=>{
        this.customersArr = [];
      for(let customer of customers)
      {
        this.custServe.getUser(customer.uid).pipe(take(1)).subscribe(user=>{
            this.customersArr.push([customer,user]);
        })
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
