import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Client} from '../model/client.model';
import {Observable} from 'rxjs';

@Injectable()
export class ClientService {

  constructor(private firestore: AngularFirestore) {
  }

  getClients(accountUID: string) {
    return this.firestore.collection('client', ref => ref
      .where('accountUID', '==', accountUID)
      .orderBy('createdAt'))
      .valueChanges()
  }

  create(client: Client) {
    return this.firestore.collection('client').add(client);
  }

  update(uid: string, client: Client) {
    return this.firestore.collection('client').doc(uid).set(client);
  }

  delete(uid: string) {
    return this.firestore.collection('client').doc(uid).delete();
  }

}
