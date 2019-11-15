import { Component, OnInit, OnDestroy } from '@angular/core';
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
  total:number;
  shoppingCart:CartItem[] = null;
  constructor(private cartServe:CartService)
  { 
    this.shoppingCart$ = this.cartServe.getCustomer().subscribe(customer=>{
      this.shoppingCart = customer.shoppingCart;
      this.total = 0;
      for(let cartItem of customer.shoppingCart)
      {
        this.total += cartItem.product.price * cartItem.quantity;
      }
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
