import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';
import { take, switchMap } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { Customer } from '../interfaces/customer';
import { CartItem } from '../interfaces/cart-item';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService 
{
  cart:CartItem[] = new Array();
  cart$:BehaviorSubject<CartItem[]>;
  constructor(private authServe:AuthService,private custServe:CustomerService) 
  { 
    if(localStorage.getItem("cart") != null)
    {
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.cart$ = new BehaviorSubject(this.cart);
      this.cart$.next(this.cart);
    }
    else{
      localStorage.setItem("cart",JSON.stringify(this.cart));
      this.cart$ = new BehaviorSubject(this.cart);
      this.cart$.next(this.cart);
    }
  }

  addToCart(product:Product)
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.custServe.getCustomer(user.uid).pipe(take(1)).subscribe(customer=>{
        for(let cartItem of customer.shoppingCart)
        {
          if(cartItem.product.uid == product.uid)
          {
            cartItem.quantity += 1;
            this.custServe.updateCustomer((user.uid.trim()),customer);
            return;
          }
        }
        customer.shoppingCart.push({product:product,quantity:1});
        this.custServe.updateCustomer((user.uid.trim()),customer);
      });
    });
  }

  removeFromCart(product:Product)
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.custServe.getCustomer(user.uid).pipe(take(1)).subscribe(customer=>{
        for(let cartIndex = 0;cartIndex<customer.shoppingCart.length;cartIndex++)
        {
          if(customer.shoppingCart[cartIndex].product.uid == product.uid)
          {
            customer.shoppingCart[cartIndex].quantity -= 1;
            if(customer.shoppingCart[cartIndex].quantity == 0)
            {
              customer.shoppingCart.splice(cartIndex,1);
            }
            this.custServe.updateCustomer((user.uid.trim()),customer);
            return;
          }
        }
      });
    });
  }

  getCustomer()
  {
    return this.custServe.getCurrentCustomer();
  }

  getUser()
  {
    return this.custServe.getCurrentUser();
  }

  updateCart(customer:Customer)
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.custServe.updateCustomer((user.uid.trim()),customer);
    })
  }

  addToGuestCart(product:Product)
  {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    for(let cartItem of this.cart)
    {
      if(cartItem.product.title == product.title)
      {
        cartItem.quantity += 1;
        localStorage.setItem("cart",JSON.stringify(this.cart));
        this.cart$.next(this.cart);
        return;
      }
    }
    this.cart.push({product:product,quantity:1});
    localStorage.setItem("cart",JSON.stringify(this.cart));
    this.cart$.next(this.cart);
    return;
  }

  removeFromGuestCart(product:Product)
  {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    for(let cartIndex = 0;cartIndex < this.cart.length;cartIndex++)
      {
        if(this.cart[cartIndex].product.title == product.title)
        {
          this.cart[cartIndex].quantity -= 1;
          if(this.cart[cartIndex].quantity == 0)
          {
            this.cart.splice(cartIndex,1);
          }
          localStorage.setItem("cart",JSON.stringify(this.cart));
          this.cart$.next(this.cart);
          return;
        }
      }
  }

}
