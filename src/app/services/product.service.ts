import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  productObservable: Observable<Product[]>;

  constructor(private afs:AngularFirestore,private orderServe:OrderService) { 
    this.productsCollection = afs.collection('products',ref => ref.orderBy("title","asc"));
    this.productObservable = this.productsCollection.valueChanges({idField:"uid"});
  }

  create(product:Product)
  {
    let id = this.afs.createId()
    product.uid = id;
    this.productsCollection.doc(id).set(product);
    return id;
  }

  lookup(uid:string):Observable<Product>
  {
    return this.afs.doc('products/'+uid).valueChanges() as Observable<Product>;
  }

  update(uid:string, product:Product)
  {
    return this.afs.doc('products/'+uid).update(product);
  }

  delete(uid:string)
  {
    return this.afs.doc('products/'+uid).delete();
  }

  updateRating(product:Product)
  {
    let sum = 0;
    let count = 0;
    this.orderServe.ordersObservable.pipe(take(1)).subscribe(orders=>{
      for(let order of orders)
      {
        if(order.foodRating != null)
        {
          for(let cartItem of order.contents)
          {
            if(product.uid == cartItem.product.uid)
            {
              sum += order.foodRating;
              count++;
            }
          }
        }
      }
      product.averageRating = sum/count;
      this.update(product.uid,product);
    })
  }
}
