import {AfterViewInit, Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GlobalSpinnerService} from "../../service/globalSpinner.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loading = false;
  loginForm: FormGroup;
  showErrorMessage = false;
  errorMessage = '';

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private globalSpinner: GlobalSpinnerService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.globalSpinner.stopLoading();
  }

  isEnter($event: any) {
    if ($event.key === 'Enter') {
      this.authService.googleSignIn();
    }
  }
}
