import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { QrComponent } from "./components/qr/qr.component";
import { TrialOrCheckoutComponent } from "./trial-or-checkout/trial-or-checkout.component";
// import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
// import { ChangePasswordComponent } from "./components/change-password/change-password.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'qr',
    component: QrComponent
  },
  {
    path: 'trailOrCheckout',
    component: TrialOrCheckoutComponent
  },
  // {
  //   path: 'forgot-password',
  //   component: ForgotPasswordComponent
  // },
  // {
  //   path: 'change-password',
  //   component: ChangePasswordComponent
  // },
  {
    path: 'restaurants',
    loadChildren: () => import('./components/restaurants/restaurants.module').then(m => m.RestaurantsModule)
  },
  // {
  //   path: 'polls',
  //   loadChildren: './components/polls/polls.module#PollsModule'
  // },
  // {
  //   path: 'live-polls',
  //   loadChildren: './components/live-polls/live-polls.module#LivePollsModule'
  // },
  // {
  //   path: 'voted-polls',
  //   loadChildren: './components/voted-polls/voted-polls.module#VotedPollsModule'
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
