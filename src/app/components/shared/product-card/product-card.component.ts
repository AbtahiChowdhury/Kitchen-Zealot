import { Component, OnInit,Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit,OnDestroy {

  @Input('product') product: Product;
  @Input('showActions') showActions = false;
  @Input('guest') guest = false;
  quantity$:Subscription;
  quantity:number = 0;

  constructor(private cartServe:CartService) 
  {
    if(this.showActions)
      this.updateQuantity();
  }

  addToCart()
  {
    this.cartServe.addToCart(this.product);
  }

  addToGuestCart()
  {
    console.log("ADDING");
  }

  removeFromCart()
  {
    this.cartServe.removeFromCart(this.product);
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
  }

  ngOnInit() {
  }

  ngOnDestroy()
  {
    if(this.showActions && !this.guest)
      this.quantity$.unsubscribe();
  }

}
