import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ingredient } from '../interfaces/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService 
{
  ingredientCollection:AngularFirestoreCollection<Ingredient>;
  ingredientsObservable:Observable<Ingredient[]>;

  constructor(private afs:AngularFirestore) 
  { 
    this.ingredientCollection = this.afs.collection("ingredients");
    this.ingredientsObservable = this.ingredientCollection.valueChanges({idField:"uid"});
  }

  create(ingredient:Ingredient)
  {
    let id = this.afs.createId()
    ingredient.uid = id;
    this.ingredientCollection.doc(id).set(ingredient);
    return id;
  }

  lookup(uid:string):Observable<Ingredient>
  {
    return this.afs.doc('ingredients/'+uid).valueChanges() as Observable<Ingredient>;
  }

  update(ingredient:Ingredient)
  {
    return this.afs.doc('ingredients/'+ingredient.uid).update(ingredient);
  }

  delete(uid:string)
  {
    return this.afs.doc('ingredients/'+uid).delete();
  }
}
