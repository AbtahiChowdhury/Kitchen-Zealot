import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadStart } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { take } from 'rxjs/operators';
import { CartItem } from 'src/app/interfaces/cart-item';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit 
{
  uid:string;
  orderedBy:string;
  orderedOn:any;
  orderDestination:string;
  cookedBy:string;
  deliveredBy:string;
  foodRating:number;
  deliveredOn:any;
  deliveryRating:number;
  customerRating:number;
  contents:CartItem[];
  subtotal:number;
  tax:number;
  discount:number;
  total:number;
  currentBid:number;
  currentBidder?:string;
  currentBidderName?:string;
  status:string;
  deliveryComment:string;

  manager:boolean = false;
  delivery:boolean = false;
  customer:boolean = false;

  constructor(private aRoute:ActivatedRoute, private orderServe:OrderService,private authServe:AuthService,private emplServe:EmployeeService) 
  { 
    this.uid = this.aRoute.snapshot.paramMap.get("uid");
    this.orderServe.getOrder(this.uid).pipe(take(1)).subscribe(order=>{
      this.orderedBy = order.orderedBy;
      this.orderedOn = order.orderedOn;
      this.orderDestination = order.orderDestination;
      this.cookedBy = order.cookedBy ? order.cookedBy : null;
      this.deliveredBy = order.deliveredBy ? order.deliveredBy : null;
      this.deliveredOn = order.deliveredOn ? order.deliveredOn : null;
      this.foodRating = order.foodRating ? order.foodRating : null;
      this.deliveryRating = order.deliveryRating ? order.deliveryRating : null;
      this.customerRating = order.customerRating ? order.customerRating : null;
      this.contents = order.contents;
      this.subtotal = order.subtotal;
      this.tax = order.tax;
      this.discount = order.discount;
      this.total = order.total;
      this.currentBid = order.currentBid ? order.currentBid : null;
      this.currentBidder = order.currentBidder ? order.currentBidder : null;
      this.currentBidderName = order.currentBidderName ? order.currentBidderName : null;
      this.status = order.status;
      this.deliveryComment = order.customerDeliveryComment ? order.customerDeliveryComment : null;
      
    })

    this.authServe.user$.pipe(take(1)).subscribe(firebaseUser=>{
      this.emplServe.getUser(firebaseUser.uid).pipe(take(1)).subscribe(user=>{
        if(user.type == "customer")
          this.customer = true;
        if(user.type == "employee")
        {
          this.emplServe.getEmployee(firebaseUser.uid).pipe(take(1)).subscribe(employee=>{
            if(employee.position == "manager")
              this.manager = true;
            if(employee.position == "delivery")
              this.delivery = true;
          })
        }
      })
    })
  }



  ngOnInit() {
  }

}
