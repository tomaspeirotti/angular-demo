import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {GlobalSpinnerService} from "../services/global-spinner.service";
import {AuthenticationService} from "../services/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loading = false;
  loginForm: any;
  showErrorMessage = false;
  errorMessage = '';

  constructor(private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private globalSpinner: GlobalSpinnerService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    this.globalSpinner.stopLoading();
  }

  login() {

  }

  isEnter($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.login();
    }
  }
}
