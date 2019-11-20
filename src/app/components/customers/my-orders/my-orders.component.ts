import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';
import { take } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {

  myOrders:Order[] = new Array();
  subscription:Subscription;
  constructor(private orderServe:OrderService,private custServe:CustomerService) { 
    this.subscription = this.orderServe.ordersObservable.subscribe(orders=>{
      this.custServe.getCurrentUser().pipe(take(1)).subscribe(user=>{
        this.myOrders = [];
        for(let order of orders)
        {
          if(order.orderedBy == user.uid)
          {
            this.myOrders.push(order);
          }
        }
      })
    });
  }

  ngOnInit() 
  {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
