import { Component, OnInit,Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('showActions') showActions = false;

  constructor(private authServe:AuthService,private custServe:CustomerService) { }

  addToCart()
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.custServe.getCustomer(user.uid).pipe(take(1)).subscribe(customer=>{
        for(let cartItem of customer.shoppingCart)
        {
          if(cartItem.product.title == this.product.title)
          {
            cartItem.quantity += 1;
            this.custServe.updateCustomer(user.uid,customer);
            return;
          }
        }
        customer.shoppingCart.push({product:this.product,quantity:1});
        this.custServe.updateCustomer(user.uid,customer);
      });
    });
  }

  ngOnInit() {
  }

}
