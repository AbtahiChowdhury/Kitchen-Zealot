import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit 
{
  sortedOrders:Map<string,number>;
  sortedArray:Array<any>;
  constructor(private orderServe:OrderService,private authServe:AuthService,private productServe:ProductService,private cartServe:CartService) { 
    this.sortedOrders = new Map();
    this.sortedArray = new Array();
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      this.orderServe.ordersObservable.pipe(take(1)).subscribe(orders=>{
        for(let order of orders)
        {
          for(let cartItem of order.contents)
          {
            if(this.sortedOrders.has(cartItem.product.title))
            {
              this.sortedOrders.set(cartItem.product.title,(this.sortedOrders.get(cartItem.product.title)+cartItem.quantity));
            }
            else
            {
              this.sortedOrders.set(cartItem.product.title,cartItem.quantity);
            }
          }
        }
        for(let value of this.sortedOrders)
        {
          this.sortedArray.push(value);
        }
        this.sortedArray = this.sortedArray.sort((a,b)=>a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0);
      })
    })
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
            this.cartServe.addToCart(product);
          }
        }
      })
    }
    recognition.start();
  }

}
