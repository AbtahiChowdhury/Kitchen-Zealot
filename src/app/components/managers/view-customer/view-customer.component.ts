import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { take } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  uid:string;
  userName:string;
  userPhone:string;
  userEmail:string;
  customerAddress:string;
  customerAverageRating:number;
  customerRank:string;

  orders$:Observable<Order[]>
  constructor(private aRoute:ActivatedRoute,private router:Router,private custServe:CustomerService,private orderServe:OrderService) 
  {
    this.uid = this.aRoute.snapshot.paramMap.get("uid");
    this.custServe.getCustomer(this.uid).pipe(take(1)).subscribe(customer=>{
      this.customerAddress = customer.address;
      this.customerAverageRating = customer.averageRating;
      this.customerRank = customer.rank;
    })

    this.custServe.getUser(this.uid).pipe(take(1)).subscribe(user=>{
      this.userName = user.name;
      this.userEmail = user.email;
      this.userPhone = user.phone;
    })
    
    this.orders$ = this.orderServe.ordersObservable;
  }

  ngOnInit() {
  }

  promote()
  {
    this.custServe.getCustomer(this.uid).pipe(take(1)).subscribe(customer=>{
      this.customerRank = "Normal";
      customer.rank = "Normal";
      this.custServe.updateCustomer(customer.uid,customer);
    })
  }

}
