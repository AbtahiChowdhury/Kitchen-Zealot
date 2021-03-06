import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pending-bids',
  templateUrl: './pending-bids.component.html',
  styleUrls: ['./pending-bids.component.css']
})
export class PendingBidsComponent implements OnInit 
{
  orders$:Observable<Order[]>
  constructor(private orderServe:OrderService, private authServe:AuthService,private userServe:UserService) 
  { 
    this.orders$ = this.orderServe.ordersObservable;
  }

  placeBid(order:Order,newBid:number)
  {
    if(newBid == null)
    {
      alert("Please enter a bid");
      return;
    }
    if(order.currentBid < newBid)
    {
      alert("Please enter an amount lower the current bid");
      return;
    }

    if(newBid < 0)
    {
      alert("Please enter a valid bid");
      return;
    }
    
    if(order.currentBid > newBid && newBid > 0 && newBid != null)
    {
      order.currentBid = newBid;
      this.authServe.user$.pipe(take(1)).subscribe(firebaseUser=>{
        this.userServe.getUser(firebaseUser.uid).pipe(take(1)).subscribe(user=>{
          order.currentBidder = user.uid;
          order.currentBidderName = user.name;
          this.orderServe.updateOrder(order.uid,order);
        })
      })
    }
  }

  ngOnInit() {
  }

}
