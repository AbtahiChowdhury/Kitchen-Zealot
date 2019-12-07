import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SupplyOrder } from '../interfaces/supply-order';

@Injectable({
  providedIn: 'root'
})
export class SupplyOrdersService {

  ordersCollection:AngularFirestoreCollection<SupplyOrder>;
  ordersObservable:Observable<SupplyOrder[]>;

  constructor(private afs:AngularFirestore) 
  { 
    this.ordersCollection = this.afs.collection("supply-orders");
    this.ordersObservable = this.ordersCollection.valueChanges({idField:"uid"});
  }

  create(order:SupplyOrder)
  {
    let id = this.afs.createId()
    order.uid = id;
    this.ordersCollection.doc(id).set(order);
    return id;
  }

  lookup(uid:string):Observable<SupplyOrder>
  {
    return this.afs.doc('supply-orders/'+uid).valueChanges() as Observable<SupplyOrder>;
  }

  update(order:SupplyOrder)
  {
    return this.afs.doc('supply-orders/'+order.uid).update(order);
  }

  delete(uid:string)
  {
    return this.afs.doc('supply-orders/'+uid).delete();
  }
}
