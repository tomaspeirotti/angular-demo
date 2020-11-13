import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {ProgressSpinnerComponent} from "./progress-spinner/progress-spinner.component";
import {LoginComponent} from "./login/login.component";
import {GlobalSpinnerService} from "./services/global-spinner.service";
import {AuthenticationService} from "./services/authentication.service";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ServiceWorkerModule} from "@angular/service-worker";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    AppComponent,
    ProgressSpinnerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatProgressSpinnerModule,
    MatCardModule
  ],
  providers: [GlobalSpinnerService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
