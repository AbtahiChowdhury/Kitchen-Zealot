import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user$;
  customer$;
  constructor(private cartServe:CartService) 
  { 
    this.user$ = this.cartServe.getUser();
  }

  ngOnInit() {
    //this.customer$ = this.cartServe.getCustomer();
  }

}
