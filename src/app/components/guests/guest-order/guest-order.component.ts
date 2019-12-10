import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-guest-order',
  templateUrl: './guest-order.component.html',
  styleUrls: ['./guest-order.component.css']
})
export class GuestOrderComponent implements OnInit {

  sortedProducts:Product[];
  constructor(private productServe:ProductService) { 
    this.productServe.productObservable.pipe(take(1)).subscribe(products=>{
      let filteredProducts = products.filter(o => o.status == "ACTIVE");
      this.sortedProducts = filteredProducts.sort((a,b)=>a.orderFrequency < b.orderFrequency ? 1 : a.orderFrequency > b.orderFrequency ? -1 : 0);
    });
  }

  ngOnInit() {
  }

}
