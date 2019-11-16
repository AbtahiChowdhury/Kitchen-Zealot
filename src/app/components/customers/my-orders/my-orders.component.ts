import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';
import { take } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myOrders:Order[] = new Array();
  constructor(private orderServe:OrderService,private custServe:CustomerService) { 
    this.orderServe.ordersObservable.pipe(take(1)).subscribe(orders=>{
      this.custServe.getCurrentUser().pipe(take(1)).subscribe(user=>{
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

  ngOnInit() {
  }

}
