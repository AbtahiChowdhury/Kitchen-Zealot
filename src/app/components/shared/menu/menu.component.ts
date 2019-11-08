import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  products$:Observable<Product[]>
  constructor(private productServe: ProductService) {
    this.products$ = productServe.productObservable; 

  }

  ngOnInit() {
  }

}
