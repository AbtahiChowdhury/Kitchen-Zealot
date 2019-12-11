import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';
import { take } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import { Subscription, Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProductService } from 'src/app/services/product.service';
import { Customer } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {

  orders$:Observable<Order[]>;
  userid:string;
  currentOrder:Order;
  customerRank:string;
  guest:boolean;
  constructor(private orderServe:OrderService,private custServe:CustomerService,private emplServe:EmployeeService,private productServe:ProductService) 
  { 
    this.orders$ = this.orderServe.ordersObservable;
    this.custServe.getCurrentCustomer().pipe(take(1)).subscribe(customer=>{
      this.userid = customer.uid;
      this.customerRank = customer.rank;
      if(this.customerRank == "Guest")
        this.guest = true;
      else
        this.guest = false;
    })
  }

  ngOnInit() 
  {
  }

  foodRatingChange(order:Order,value:string)
  {
    if(Number(value) < 3)
    {
      document.getElementById("foodCommentButton").click();
    }
    
    for(let item of order.contents)
    {
      if(item.product.category != "FREE")
        this.productServe.updateRating(item.product);
    }
    
    order.foodRating = Number(value);
    this.currentOrder = order;
    this.orderServe.updateOrder(order.uid,order);
  }

  addFoodComment(comment:string)
  {
    this.currentOrder.customerFoodComment = comment;
    this.orderServe.updateOrder(this.currentOrder.uid,this.currentOrder);
  }

  deliveryRatingChange(order:Order,value:string)
  {
    if(Number(value) < 3)
    {
      document.getElementById("deliveryRatingButton").click();
    }
    order.deliveryRating = Number(value);
    this.currentOrder = order;
    this.orderServe.updateOrder(order.uid,order);
    this.emplServe.updateAverageDeliveryRating(order.deliveredBy);
  }

  addDeliveryComment(comment:string)
  {
    this.currentOrder.customerDeliveryComment = comment;
    this.orderServe.updateOrder(this.currentOrder.uid,this.currentOrder);
  }

  ngOnDestroy(){
  }

}
