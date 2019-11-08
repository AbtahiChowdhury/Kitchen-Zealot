import { Component, OnInit,Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('showActions') showActions = true;

  constructor() { }

  ngOnInit() {
  }

}
