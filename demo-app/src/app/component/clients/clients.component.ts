import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DocumentReference} from "@angular/fire/firestore";
import {Client} from 'src/app/model/client.model';
import {AuthService} from "../../service/auth.service";
import * as moment from 'moment';
import {formatDate} from "@angular/common";
import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;
import {ClientService} from '../../service/client.service';

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
              private authService: AuthService,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUserUID = user.uid;
      this.clientService.getClients(this.currentUserUID).subscribe((clients: any) => {
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
    this.clientService.create(client)
      .then((docRef: DocumentReference) => {
        this.loading = false;
        client.uid = docRef.id;
        this.clientService.update(docRef.id, client);
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
    this.clientService.delete(client.uid);
  }

  // @ts-ignore
  getMaxDate(): Date {
    // @ts-ignore
    return new Date();
  }
}
