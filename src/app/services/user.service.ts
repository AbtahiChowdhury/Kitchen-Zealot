import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;
  usersObservable: Observable<User[]>;

  constructor(private afs:AngularFirestore) { 
    this.userCollection = this.afs.collection('users');
    this.usersObservable = this.userCollection.valueChanges({idfield:"uid"});
  }

  addUser(user:User)
  {
    this.userCollection.doc(user.uid).set(user);
  }

  removeUser(user:User)
  {
    this.afs.doc("users/" + user.uid).delete();
  }

  getUser(uid:string):Observable<User>
  {
    return this.afs.doc("users/" + uid).valueChanges() as Observable<User>;
  }
}
