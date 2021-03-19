import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// DateTimePickerModule
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

// ajax loader
import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedModule } from "./components/shared/shared.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JwtInterceptorService } from "./services/jwt-interceptor.service";
import { QrComponent } from './components/qr/qr.component';
import { SignupComponent } from './components/signup/signup.component';
import { TrialOrCheckoutComponent } from './trial-or-checkout/trial-or-checkout.component';

// import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    // SharedComponent
    LoginComponent,
    DashboardComponent,
    QrComponent,
    SignupComponent,
    TrialOrCheckoutComponent,
    // ForgotPasswordComponent,
    // ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgxSpinnerModule,
    DateTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
