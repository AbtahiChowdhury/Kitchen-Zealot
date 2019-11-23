import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart-item';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit,OnDestroy {

  @Input('product') product: Product;
  @Input('showActions') showActions = false;
  @Input('guest') guest = false;
  localCart:CartItem[] = new Array();
  quantity$:Subscription;
  quantity:number = 0;

  constructor(private cartServe:CartService) 
  {
  }

  addToCart()
  {
    this.cartServe.addToCart(this.product);
  }

  addToGuestCart()
  {
    this.cartServe.addToGuestCart(this.product);
    this.localCart = JSON.parse(localStorage.getItem("cart"));
    for(let cartItem of this.localCart)
    {
      if(cartItem.product.title == this.product.title)
      {
        this.quantity = cartItem.quantity;
        return;
      }
    }
  }

  removeFromCart()
  {
    this.cartServe.removeFromCart(this.product);
  }

  removeFromGuestCart()
  {
    this.cartServe.removeFromGuestCart(this.product);
    this.localCart = JSON.parse(localStorage.getItem("cart"));
    for(let cartItem of this.localCart)
    {
      if(cartItem.product.title == this.product.title)
      {
        this.quantity = cartItem.quantity;
        return;
      }
    }
    this.quantity = 0;
  }

  updateQuantity()
  {
    if(!this.guest)
    {
      this.quantity$ = this.cartServe.getCustomer().subscribe(customer=>{
        for(let cartItem of customer.shoppingCart)
        {
          if(cartItem.product.title == this.product.title)
          {
            this.quantity = cartItem.quantity;
            return;
          }
        }
        this.quantity = 0;
      })
    }
    else
    {
      if(localStorage.getItem("cart") === null)
      {
        localStorage.setItem("cart",JSON.stringify(this.localCart));
      }
      else
      {
        this.localCart = JSON.parse(localStorage.getItem("cart"));
      }
      for(let cartItem of this.localCart)
      {
        if(cartItem.product.title == this.product.title)
        {
          this.quantity = cartItem.quantity;
          return;
        }
      }
    }
  }

  ngOnInit() 
  {
    if(this.showActions)
      this.updateQuantity();
  }

  ngOnDestroy()
  {
    if(this.showActions && !this.guest)
      this.quantity$.unsubscribe();
  }

}
