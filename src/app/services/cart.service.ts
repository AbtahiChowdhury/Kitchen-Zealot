import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';
import { take, switchMap } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService 
{
  constructor(private authServe:AuthService,private custServe:CustomerService) { }

  addToCart(product:Product)
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.custServe.getCustomer(user.uid).pipe(take(1)).subscribe(customer=>{
        for(let cartItem of customer.shoppingCart)
        {
          if(cartItem.product.title == product.title)
          {
            cartItem.quantity += 1;
            this.custServe.updateCustomer(user.uid,customer);
            return;
          }
        }
        customer.shoppingCart.push({product:product,quantity:1});
        this.custServe.updateCustomer(user.uid,customer);
      });
    });
  }

  removeFromCart(product:Product)
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.custServe.getCustomer(user.uid).pipe(take(1)).subscribe(customer=>{
        for(let cartIndex = 0;cartIndex<customer.shoppingCart.length;cartIndex++)
        {
          if(customer.shoppingCart[cartIndex].product.title == product.title)
          {
            customer.shoppingCart[cartIndex].quantity -= 1;
            if(customer.shoppingCart[cartIndex].quantity == 0)
            {
              customer.shoppingCart.splice(cartIndex,1);
            }
            this.custServe.updateCustomer(user.uid,customer);
            return;
          }
        }
      });
    });
  }

  getCustomer()
  {
    return this.authServe.user$.pipe(switchMap(user=>{
      return this.custServe.getCustomer(user.uid)
    }));
  }

}
