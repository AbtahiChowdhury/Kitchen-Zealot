import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadStart } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { take } from 'rxjs/operators';
import { CartItem } from 'src/app/interfaces/cart-item';

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
  deliveredOn:Date;
  deliveryRating:number;
  customerRating:number;
  contents:CartItem[];
  subtotal:number;
  tax:number;
  discount:number;
  total:number;
  currentBid:number;
  currentBidder?:string;
  status:string;

  constructor(private aRoute:ActivatedRoute, private orderServe:OrderService) 
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
      this.status = order.status;
    })
  }

  ngOnInit() {
  }

}
