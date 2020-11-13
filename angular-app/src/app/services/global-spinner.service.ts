import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSpinnerService {

  private spinnerSubject = new BehaviorSubject<boolean>(false);
  spinnerObservable = this.spinnerSubject.asObservable();

  constructor() {
  }

  startLoading() {
    this.spinnerSubject.next(true);
  }

  stopLoading() {
    this.spinnerSubject.next(false);
  }

}
