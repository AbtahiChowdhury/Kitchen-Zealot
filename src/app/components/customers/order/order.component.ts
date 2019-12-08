import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit 
{
  sortedOrders:Product[];
  constructor(private orderServe:OrderService,private authServe:AuthService) { 
    
  }

  ngOnInit() {
  }

}
