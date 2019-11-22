import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item';

@Component({
  selector: 'app-guest-cart',
  templateUrl: './guest-cart.component.html',
  styleUrls: ['./guest-cart.component.css']
})
export class GuestCartComponent implements OnInit {

  shoppingCart:CartItem[];
  quantity = 0;
  constructor() { }

  ngOnInit() {
  }

}
