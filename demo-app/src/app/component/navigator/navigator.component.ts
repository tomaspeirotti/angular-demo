import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SidenavService} from "../../service/sidenav.service";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../service/auth.service";
import {Module} from "../../model/module.model";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements AfterViewInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  modules: Module[] = [
    {
      selected: true,
      name: 'Clients',
      icon: 'person',
      description: 'Manage your Clients'
    },
    {
      selected: false,
      name: 'Reporting',
      icon: 'leaderboard',
      description: 'Client statistics'
    }
  ];
  selectedModule: Module;
  currentUser: any;

  constructor(public sidenavService: SidenavService,
              public authService: AuthService,
              public firebaseAuth: AngularFireAuth) {
    this.selectedModule = this.modules.find((m: Module) => {
      if (m.selected) {
        return m;
      }
    });
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.sidenavService.toggle();
    this.firebaseAuth.user.subscribe((user) => {
      this.currentUser = user;
    });
  }

  openModule(module: Module) {
    this.selectedModule = module;
    this.modules.map((m: Module) => {
      m.selected = m.name === module.name;
      return m;
    });
  }

}
