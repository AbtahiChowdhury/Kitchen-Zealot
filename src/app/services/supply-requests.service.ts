import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SupplyRequest } from '../interfaces/supply-request';

@Injectable({
  providedIn: 'root'
})
export class SupplyRequestsService {

  requestsCollection:AngularFirestoreCollection<SupplyRequest>;
  requestsObservable:Observable<SupplyRequest[]>;

  constructor(private afs:AngularFirestore) 
  { 
    this.requestsCollection = this.afs.collection("supply-requests");
    this.requestsObservable = this.requestsCollection.valueChanges({idField:"uid"});
  }

  create(request:SupplyRequest)
  {
    let id = this.afs.createId()
    request.uid = id;
    this.requestsCollection.doc(id).set(request);
    return id;
  }

  lookup(uid:string):Observable<SupplyRequest>
  {
    return this.afs.doc('supply-requests/'+uid).valueChanges() as Observable<SupplyRequest>;
  }

  update(request:SupplyRequest)
  {
    return this.afs.doc('supply-requests/'+request.uid).update(request);
  }

  delete(uid:string)
  {
    return this.afs.doc('supply-requests/'+uid).delete();
  }
}
