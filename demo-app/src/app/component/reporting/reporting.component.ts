import {Component, EventEmitter, OnInit} from '@angular/core';
import {ClientService} from '../../service/client.service';
import {AuthService} from '../../service/auth.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {Client} from 'src/app/model/client.model';
import * as math from 'mathjs';
import * as moment from 'moment';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

  clients: Client[] = [];
  currentUserUID: string;

  // KPIs
  avgAge: number;
  standardDeviation: number;
  clientsBirthdayByMonth: any[] = [];
  clientsByMonth: any[] = [];

  constructor(private clientService: ClientService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients() {
    this.authService.getCurrentUser().pipe(
      map(user => user.uid),
      tap(uid => this.currentUserUID = uid),
      switchMap(uid => this.clientService.getClients(uid)),
      tap((clients: Client[]) => {
        this.clients = clients;
        this.calculateReports(clients);
      })
    ).subscribe();
  }

  private calculateReports(clients: Client[]) {
    this.avgAge = math.mean(...clients.map(c => c.age)).toFixed(2);
    this.standardDeviation = math.std(...clients.map(c => c.age)).toFixed(2);

    const clientsByBirthdayByMonthMap = new Map<string, number>();
    const clientsByCreationDateMonthMap = new Map<string, number>();
    clients.forEach(client => {

      const birthday = moment(client.dateOfBirth.seconds * 1000).format("MMM");
      const prevValue1 = clientsByBirthdayByMonthMap.get(birthday);
      clientsByBirthdayByMonthMap.set(birthday, prevValue1 ? prevValue1 + 1 : 1);
      this.clientsBirthdayByMonth.push({
        name: birthday,
        value: clientsByBirthdayByMonthMap.get(birthday)
      });

      const createdAt = moment(client.createdAt.seconds * 1000).format("MMM");
      const prevValue2 = clientsByCreationDateMonthMap.get(birthday);
      clientsByCreationDateMonthMap.set(createdAt, prevValue2 ? prevValue2 + 1 : 1);
      this.clientsByMonth.push({
        name: createdAt,
        value: clientsByCreationDateMonthMap.get(createdAt)
      })

    });
  }


}
