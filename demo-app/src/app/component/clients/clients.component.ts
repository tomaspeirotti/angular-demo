import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {Client} from 'src/app/model/client.model';
import {AuthService} from "../../service/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";
import * as moment from 'moment';
import {formatDate} from "@angular/common";
import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, AfterViewInit {

  clientForm: FormGroup;
  loading: boolean = false;
  clients: any[] = [];
  currentUserUID: string;
  columns: string[] = ['name', 'dateOfBirth', 'age', 'actions'];

  constructor(private formBuilder: FormBuilder,
              private firestore: AngularFirestore,
              private authService: AuthService,
              private firebaseAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    this.firebaseAuth.user.subscribe((user) => {
      this.currentUserUID = user.uid;
      this.firestore.collection('client', ref => ref
        .where('accountUID', '==', this.currentUserUID)
        .orderBy('createdAt'))
        .valueChanges()
        .subscribe((clients: any) => {
          this.clients = clients;
        })
    });
  }

  create() {
    const client: Client = {
      name: this.clientForm.value.name,
      dateOfBirth: this.clientForm.value.dateOfBirth,
      age: moment().diff(this.clientForm.value.dateOfBirth, 'years'),
      accountUID: this.currentUserUID,
      createdAt: Timestamp.now()
    };
    this.loading = true;
    this.firestore.collection('client').add(client)
      .then((docRef: DocumentReference) => {
        this.loading = false;
        client.uid = docRef.id;
        this.firestore.collection('client').doc(docRef.id).set(client);
        this.clientForm.reset();
      })
      .catch((error: any) => this.loading = false);
  }

  getParsedDate(dateOfBirth: any) {
    if (dateOfBirth) {
      const date: any = moment(dateOfBirth.seconds * 1000, 'x').toDate();
      return formatDate(date, 'shortDate', 'en_US');
    }
    return '';
  }

  delete(client: Client) {
    this.firestore.collection('client').doc(client.uid).delete();
  }
}
