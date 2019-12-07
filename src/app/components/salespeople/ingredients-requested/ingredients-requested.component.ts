import { Component, OnInit } from '@angular/core';
import { SupplyRequestsService } from 'src/app/services/supply-requests.service';
import { Observable } from 'rxjs';
import { SupplyRequest } from 'src/app/interfaces/supply-request';
import { SupplyOrdersService } from 'src/app/services/supply-orders.service';
import { SupplyOrder } from 'src/app/interfaces/supply-order';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-ingredients-requested',
  templateUrl: './ingredients-requested.component.html',
  styleUrls: ['./ingredients-requested.component.css']
})
export class IngredientsRequestedComponent implements OnInit 
{
  requests$:Observable<SupplyRequest[]>;
  orders$:Observable<SupplyOrder[]>;
  constructor(private requestsServe:SupplyRequestsService,private orderServe:SupplyOrdersService,private authServe:AuthService) 
  { 
    this.requests$ = this.requestsServe.requestsObservable;
    this.orders$ = this.orderServe.ordersObservable;
  }

  complete(request:SupplyRequest)
  {
    this.authServe.user$.pipe(take(1)).subscribe(user=>{
      request.status = "Complete";
      request.completedBy = user.uid;
      this.requestsServe.update(request);
    })
  }
  ngOnInit() {
  }

}
