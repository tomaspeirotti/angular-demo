import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {MatSidenav} from "@angular/material/sidenav";
import {SidenavService} from "./service/sidenav.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService) {}
}
