import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Order } from '../interfaces/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderCollection: AngularFirestoreCollection<Order>;
  ordersObservable:Observable<Order[]>;
  constructor(private afs:AngularFirestore) 
  { 
    this.orderCollection = this.afs.collection("orders");
    this.ordersObservable = this.orderCollection.valueChanges({idfield:"uid"});
  }

  addOrder(order:Order)
  {
    this.orderCollection.add(order);
  }

  removeOrder(order:Order)
  {
    this.afs.doc("orders/" + order.uid).delete();
  }
}
