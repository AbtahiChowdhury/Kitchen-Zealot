import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  productObservable: Observable<Product[]>;

  constructor(private afs:AngularFirestore) { 
    this.productsCollection = afs.collection('products',ref => ref.orderBy("title","asc"));
    this.productObservable = this.productsCollection.valueChanges({idField:"uid"});
  }

  create(product:Product)
  {
    this.productsCollection.add(product);
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
}
