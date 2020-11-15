import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SidenavService} from "../../service/sidenav.service";
import {MatSidenav} from "@angular/material/sidenav";
import {User} from "../../model/user.model";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements AfterViewInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  user: User;

  constructor(public sidenavService: SidenavService,
              public authService: AuthService) {
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.toggle();
    this.authService.user$.subscribe(user => this.user = user);
  }

}
