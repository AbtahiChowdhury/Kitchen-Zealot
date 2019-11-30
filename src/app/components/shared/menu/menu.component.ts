import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit,OnDestroy {

  @Input('showActions')showActions;
  @Input('guest') guest = false;
  @Input('cook') cook = false;
  products$:Observable<Product[]>
  mainProduct:Product[];
  sideProduct:Product[];
  subscription:Subscription;

  constructor(private productServe: ProductService) {
    this.products$ = productServe.productObservable;
    this.subscription = this.products$.subscribe(products=>{
      this.mainProduct = new Array();
      this.sideProduct = new Array();
      for(let product of products)
      {
        if(product.category == "Main")
          this.mainProduct.push(product);
        if(product.category == "Side")
          this.sideProduct.push(product);
      }
    })

  }

  ngOnInit() {
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
