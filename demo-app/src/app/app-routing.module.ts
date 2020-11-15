import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {AuthGuard} from "./service/auth.guard";
import {NavigatorComponent} from "./component/navigator/navigator.component";
import {GuestGuard} from "./service/guest.guard";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}, //, canActivate: [GuestGuard]
  {path: 'app', component: NavigatorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
