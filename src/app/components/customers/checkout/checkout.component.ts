import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { take } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';
import { OrderComponent } from '../order/order.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userName:string = "";
  userPhone:string = "";
  customerAddress:string = "";
  customerNameOnCard:string = "";
  customerCardNumber:string = "";
  customerCVV:number = 0;
  customerExpirationDate:string = "";
  constructor(private cartServe:CartService,private orderServe:OrderService,private router:Router) 
  { 
    this.cartServe.getUser().pipe(take(1)).subscribe(user=>{
      this.userName = user.name;
      this.userPhone = user.phone;
    });

    this.cartServe.getCustomer().pipe(take(1)).subscribe(customer=>{
      this.customerAddress = customer.address;
      this.customerNameOnCard = customer.nameOnCard;
      this.customerCardNumber = customer.cardNumber;
      this.customerExpirationDate = customer.expirationDate;
      this.customerCVV = customer.CVV;
    });
  }

  ngOnInit() {
    //this.customer$ = this.cartServe.getCustomer();
  }
  
  checkout(form)
  {
    let order:Order = {contents:null,orderedBy:null,orderedOn:null,subtotal:0,tax:0,discount:0,total:0};
    this.cartServe.getCustomer().pipe(take(1)).subscribe(customer=>{
      this.cartServe.getUser().pipe(take(1)).subscribe(user=>{
        order.contents = customer.shoppingCart;
        order.orderedBy = user.uid;
        order.orderedOn = new Date();
        for(let cartItem of order.contents)
        {
          order.subtotal += cartItem.product.price * cartItem.quantity;
        }
        order.tax = order.subtotal * .08;
        order.discount = order.tax;
        order.total = order.subtotal;
        this.orderServe.addOrder(order);
        customer.shoppingCart = [];
        this.cartServe.updateCart(customer);
        this.router.navigateByUrl("/customer/my-orders");
      })
    })
  }

}
