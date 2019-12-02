import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blacklisted } from '../interfaces/blacklisted';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService 
{
  blackListObservable:Observable<Blacklisted[]>;
  blackListCollection:AngularFirestoreCollection<Blacklisted>;
  constructor(private afs:AngularFirestore) { 
    this.blackListCollection = this.afs.collection("blacklist");
    this.blackListObservable = this.blackListCollection.valueChanges({idField:"uid"});
  }

  addToBlacklist(email:string)
  {
    let tempbl = {email:email};
    this.blackListCollection.doc(email).set(tempbl);
  }

  removeFromBlacklist(email:string)
  {
    this.afs.doc("blacklist/" + email).delete();
  }

  isOnBlacklist(email:string)
  {
    return this.afs.doc("blacklist/"+email).get().pipe(map(blacklist=>{
      return blacklist.exists;
    }));
  }
}
