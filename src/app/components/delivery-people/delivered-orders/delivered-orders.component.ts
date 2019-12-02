import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { take } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivered-orders',
  templateUrl: './delivered-orders.component.html',
  styleUrls: ['./delivered-orders.component.css']
})
export class DeliveredOrdersComponent implements OnInit {
  
  orders$:Observable<Order[]>;
  deliveryUid:string;

  constructor(private orderServe:OrderService,private authServe:AuthService,private emplService:EmployeeService,private custServe:CustomerService) 
  { 
    this.orders$ = this.orderServe.ordersObservable;
    this.authServe.user$.pipe(take(1)).subscribe(firebaseUser=>{
      this.deliveryUid = firebaseUser.uid;
    })
    
  }

  outForDelivery(order:Order)
  {
    order.status = "OUT FOR DELIVERY";
    this.orderServe.updateOrder(order.uid,order);
  }

  delivered(order:Order)
  {
    this.authServe.user$.pipe(take(1)).subscribe(firebaseUser=>{
      this.deliveryUid = firebaseUser.uid;
      order.status = "DELIVERED";
      order.deliveredBy = firebaseUser.uid;
      order.deliveredOn = new Date();
      this.orderServe.updateOrder(order.uid,order);
    })
  }

  customerRatingChange(order:Order,value:string)
  {
    order.customerRating = Number(value);
    this.orderServe.updateOrder(order.uid,order);
    this.custServe.updateRating(order.orderedBy);
  }

  track(order:Order)
  {
    let parsedAddress = order.orderDestination.replace(" ","+");
    window.location.href = "https://www.google.com/maps/dir/The+City+College+of+New+York,+160+Convent+Ave,+New+York,+NY+10031/"+parsedAddress;
  }

  ngOnInit() {
  }

}
