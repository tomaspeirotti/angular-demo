import {AfterViewInit, Component} from '@angular/core';
import {GlobalSpinnerService} from "./services/global-spinner.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  loading = true;

  constructor(private spinner: GlobalSpinnerService) {
    this.spinner.startLoading();
  }

  ngAfterViewInit(): void {
    this.subscribeToSpinner();
  }

  subscribeToSpinner() {
    this.spinner.spinnerObservable.subscribe(status => {
      this.loading = status;
    });
  }
}
