import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  uid:string;
  constructor(private aRoute:ActivatedRoute, private orderServe:OrderService) 
  { 
    this.uid = this.aRoute.snapshot.paramMap.get("uid");
  }

  ngOnInit() {
  }

}
