import {Injectable} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";

@Injectable()
export class SidenavService {

  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    if (!this.sidenav) {
      this.sidenav = sidenav;
    }
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  public isOpened() {
    return this.sidenav.opened;
  }
}
