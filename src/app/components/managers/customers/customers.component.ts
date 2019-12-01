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

  normalCustomersArr:[Customer,User][] = new Array();
  VIPCustomersArr:[Customer,User][] = new Array();
  guestCustomersArr:[Customer,User][] = new Array();
  blacklistedCustomersArr:[Customer,User][] = new Array();
  subscription:Subscription;
  subscription2:Subscription;
  constructor(private custServe:CustomerService) 
  { 
    
  }

  ngOnInit() 
  {
    this.subscription = this.custServe.customersObservable.subscribe(customers=>{
      this.normalCustomersArr = [];
      this.VIPCustomersArr = [];
      this.guestCustomersArr = [];
      this.blacklistedCustomersArr = [];
      for(let customer of customers)
      {
        this.subscription2 = this.custServe.getUser(customer.uid).subscribe(user=>
        {
          if(customer.rank == "VIP")
            this.VIPCustomersArr.push([customer,user]);
          if(customer.rank == "Normal")
            this.normalCustomersArr.push([customer,user]);
          if(customer.rank == "Guest")
            this.guestCustomersArr.push([customer,user]);
          if(customer.rank == "Blacklisted")
            this.blacklistedCustomersArr.push([customer,user]);
        })
      }
    })
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
