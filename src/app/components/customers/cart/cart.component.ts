import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy 
{
  shoppingCart$:Subscription;
  subtotal:number = 0;
  tax:number = 0;
  discount:number = 0;
  total:number = 0;
  shoppingCart:CartItem[] = null;

  @Input('checkout') checkout = false;
  constructor(private cartServe:CartService)
  { 
    this.shoppingCart$ = this.cartServe.getCustomer().subscribe(customer=>{
      this.shoppingCart = customer.shoppingCart;
      this.subtotal = 0;
      for(let cartItem of customer.shoppingCart)
      {
        this.subtotal += cartItem.product.price * cartItem.quantity;
      }
      this.tax = this.subtotal * .08;
      this.discount = this.tax;
      this.total = this.subtotal;
    });
  }

  ngOnInit() 
  {
    
  }

  ngOnDestroy()
  {
    this.shoppingCart$.unsubscribe();
  }

}
