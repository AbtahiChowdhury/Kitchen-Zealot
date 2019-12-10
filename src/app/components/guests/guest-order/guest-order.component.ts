import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-guest-order',
  templateUrl: './guest-order.component.html',
  styleUrls: ['./guest-order.component.css']
})
export class GuestOrderComponent implements OnInit {

  sortedProducts:Product[] = new Array();
  constructor(private productServe:ProductService,private cartServe:CartService) { 
    this.productServe.productObservable.pipe(take(1)).subscribe(products=>{
      this.sortedProducts = new Array();
      let filteredProducts = products.filter(o => o.status == "ACTIVE");
      this.sortedProducts = filteredProducts.sort((a,b)=>a.orderFrequency < b.orderFrequency ? 1 : a.orderFrequency > b.orderFrequency ? -1 : 0);
    });
  }

  ngOnInit() {
  }

  vOrder()
  {
    const speechRecognition = Window['webkitSpeechRecognition'];
    const {webkitSpeechRecognition} = (window as any);
    let recognition = new webkitSpeechRecognition();
    recognition.onresult = (event) =>{
      let speechToText:string = event.results[0][0].transcript;
      console.log(speechToText);
      this.productServe.dummyChange();
      this.productServe.productObservable.pipe(take(1)).subscribe(products=>{
        for(let product of products)
        {
          if(product.title.toLowerCase() == speechToText.toLowerCase())
          {
            this.cartServe.addToGuestCart(product);
          }
        }
      })
    }
    recognition.start();
  }

}
