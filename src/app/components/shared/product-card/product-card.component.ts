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
  quantity$:Subscription;
  quantity:number = 0;

  constructor(private cartServe:CartService) 
  {
    this.updateQuanity();
  }

  addToCart()
  {
    this.cartServe.addToCart(this.product);
  }

  removeFromCart()
  {
    this.cartServe.removeFromCart(this.product);
  }

  updateQuanity()
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

  ngOnInit() {
  }

  ngOnDestroy()
  {
    this.quantity$.unsubscribe();
  }

}
