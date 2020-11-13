import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  // { path: 'init/:token/chat', component: InitializerComponent },
  // { path: 'chat', component: ChatComponent, canActivate: [AuthenticatedGuard] },
  // { path: '401', component: FourOhOnePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
