import {AfterViewInit, Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GlobalSpinnerService} from "../../service/globalSpinner.service";
import {Router} from "@angular/router";

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
              private globalSpinner: GlobalSpinnerService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.globalSpinner.stopLoading();
    this.authService.user$.subscribe(user => {
      if (user) {
        this.router.navigate(['/app']);
      }
    });
  }

  isEnter($event: any) {
    if ($event.key === 'Enter') {
      this.authService.googleSignIn();
    }
  }
}
