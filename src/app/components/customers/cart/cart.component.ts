import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
  constructor(private authServe:AuthService,private custServe:CustomerService)
  { 
    this.shoppingCart$ = this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.custServe.getCustomer(user.uid).subscribe(customer=>{
        this.shoppingCart = customer.shoppingCart;
        this.total = 0;
        for(let cartItem of customer.shoppingCart)
        {
          this.total += cartItem.product.price * cartItem.quantity;
        }
      });
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
