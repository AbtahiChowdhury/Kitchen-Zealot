import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CartItem } from 'src/app/interfaces/cart-item';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit 
{
  shoppingCart:CartItem[] = null;
  constructor(private authServe:AuthService,private custServe:CustomerService) { 
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.custServe.getCustomer(user.uid).pipe(take(1)).subscribe(customer=>{
        this.shoppingCart = customer.shoppingCart;
      })
    })
  }

  ngOnInit() {
  }

}
