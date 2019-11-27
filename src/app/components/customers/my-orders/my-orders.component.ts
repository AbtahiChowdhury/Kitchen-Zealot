import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';
import { take } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {

  orders$:Observable<Order[]>;
  userid:string;
  constructor(private orderServe:OrderService,private custServe:CustomerService) 
  { 
    this.orders$ = this.orderServe.ordersObservable;
    this.custServe.getCurrentUser().pipe(take(1)).subscribe(user=>{
      this.userid = user.uid;
    })
  }

  ngOnInit() 
  {
  }

  foodRatingChange(order:Order,value:string)
  {
    if(Number(value) < 3)
    {

    }
    order.foodRating = Number(value);
    this.orderServe.updateOrder(order.uid,order);
  }

  ngOnDestroy(){
  }

}
