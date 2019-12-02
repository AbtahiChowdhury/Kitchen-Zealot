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
  sortedProducts:Product[];
  subscription:Subscription;

  constructor(private productServe: ProductService) {
    this.products$ = productServe.productObservable;
    this.subscription = this.products$.subscribe(products=>{
      this.mainProduct = new Array();
      this.sideProduct = new Array();
      this.sortedProducts = new Array();
      for(let product of products)
      {
        if(product.category == "Main")
        {
          this.mainProduct.push(product);
          this.sortedProducts.push(product);
        }
        if(product.category == "Side")
          this.sideProduct.push(product);
      }

      this.sortedProducts = this.sortedProducts.sort((a, b) => a.orderFrequency < b.orderFrequency ? 1 : a.orderFrequency > b.orderFrequency ? -1 : 0);
      for(let i = 0;i<this.sortedProducts.length;i++)
      {
        if(this.sortedProducts[i].status != "ACTIVE")
          this.sortedProducts.splice(i,1);
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
