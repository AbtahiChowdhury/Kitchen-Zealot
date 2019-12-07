import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IngredientCartItem } from '../interfaces/ingredient-cart-item';
import { Observable } from 'rxjs';
import { IngredientsService } from './ingredients.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService 
{
  inventoryCollection:AngularFirestoreCollection<IngredientCartItem>;
  inventoryObservable:Observable<IngredientCartItem[]>;

  constructor(private afs:AngularFirestore,private ingredientServe:IngredientsService) 
  { 
    this.inventoryCollection = this.afs.collection("inventory");
    this.inventoryObservable = this.inventoryCollection.valueChanges({idField:"uid"});
  }

  create(ingredientCartItem:IngredientCartItem)
  {
    let id = ingredientCartItem.ingredient.uid;
    ingredientCartItem.uid = ingredientCartItem.ingredient.uid;
    this.inventoryCollection.doc(id).set(ingredientCartItem);
    return id;
  }

  lookup(uid:string):Observable<IngredientCartItem>
  {
    return this.afs.doc('inventory/'+uid).valueChanges() as Observable<IngredientCartItem>;
  }

  update(ingredientCartItem:IngredientCartItem)
  {
    return this.afs.doc('inventory/'+ingredientCartItem.uid).update(ingredientCartItem);
  }

  delete(uid:string)
  {
    return this.afs.doc('inventory/'+uid).delete();
  }

  
  dummyChange()
  {
    let id = this.afs.createId();
    let dummyItem = {
      ingredient:{
        uid:"",
        title: "",
        price: 0,
        category: "",
        imageUrl: "",
        orderFrequency:0
      },
      quantity:20,
      requestedQuantity:0,
      uid:id
    }
    this.inventoryCollection.doc(id).set(dummyItem);
    this.afs.doc('inventory/'+id).delete();
  }
}
