import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item';
import { Subscription, Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';

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

  products$:Observable<Product[]>
  VIPActionDone:boolean = true;
  freeItemSelected:Product;
  @Input('checkout') checkout = false;
  @Input('guest') guest = false;
  constructor(private cartServe:CartService,private productServe:ProductService,private router:Router,private custServe:CustomerService)
  { 
    this.products$ = this.productServe.productObservable;
  }

  ngOnInit() 
  {
    if(this.guest)
    {
      this.shoppingCart = this.cartServe.cart;
      this.shoppingCart$ = this.cartServe.cart$.subscribe(cart=>{
        this.shoppingCart = cart;
        this.subtotal = 0;
        for(let cartItem of cart)
        {
          this.subtotal += cartItem.product.price * cartItem.quantity;
        }
        this.tax = this.subtotal * .08;
        this.discount = 0;
        this.total = this.subtotal + this.tax;
      })
    }
    else
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
        if(customer.rank == "Guest")
          this.discount = 0;
        this.total = this.subtotal+this.tax-this.discount;
      });
    }
    
  }

  ngOnDestroy()
  {
    this.shoppingCart$.unsubscribe();
  }

  order()
  {
    this.cartServe.getCustomer().pipe(take(1)).subscribe(customer=>{
      if(customer.rank == "VIP")
      {
        for(let cartItem of customer.shoppingCart)
        {
          if(cartItem.product.category == 'FREE')
          {
            this.VIPActionDone = true;
            this.router.navigateByUrl("/customer/checkout");
            return;
          }
        }
        document.getElementById("freeItemButton").click();
        this.VIPActionDone = false;
      }

      if(this.VIPActionDone)
        this.router.navigateByUrl("/customer/checkout");
    })
  }

  addFreeFood()
  {
    if(this.freeItemSelected)
    {
      var clone = Object.assign({}, this.freeItemSelected);
      clone.category = "FREE";
      clone.price = 0;
      clone.title = "FREE "+ this.freeItemSelected.title;
      this.cartServe.addToCart(clone);
    }
    this.VIPActionDone = true;
  }

}
