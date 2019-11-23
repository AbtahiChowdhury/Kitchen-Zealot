import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-guest-cart',
  templateUrl: './guest-cart.component.html',
  styleUrls: ['./guest-cart.component.css']
})
export class GuestCartComponent implements OnInit, OnDestroy {

  shoppingCart:CartItem[];
  subscription:Subscription;
  subtotal:number = 0;
  constructor(private cartServe:CartService) 
  { 
    this.shoppingCart = this.cartServe.cart;
    this.subscription = this.cartServe.cart$.subscribe(cart=>{
      this.shoppingCart = cart;
      this.subtotal = 0;
      for(let cartItem of cart)
      {
        this.subtotal += cartItem.product.price * cartItem.quantity;
      }
    })
  
  }

  ngOnInit() {
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
