import { Component, OnInit,Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('showActions') showActions = false;
  quantity:number = 0;

  constructor(private cartServe:CartService) 
  {
    this.updateQuanity();
  }

  addToCart()
  {
    this.cartServe.addToCart(this.product);
    this.updateQuanity();
  }

  removeFromCart()
  {
    this.cartServe.removeFromCart(this.product);
    this.updateQuanity();
  }

  updateQuanity()
  {
    this.cartServe.getCustomer().pipe(take(1)).subscribe(customer=>{
      for(let cartItem of customer.shoppingCart)
      {
        if(cartItem.product.title == this.product.title)
        {
          this.quantity = cartItem.quantity;
        }
      }
    })
  }

  ngOnInit() {
  }

}
