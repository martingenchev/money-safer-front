import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { SignUpComponent } from './sign-up/sign-up.component';
import {DashboardComponent, DialogDeleteTransaction} from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ProfileComponent } from './profile/profile.component';
import {CountriesService} from './services/countries.service';
import {MatSelectModule} from '@angular/material/select';
import {UserService} from './services/user.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthService} from './services/auth.service';
import {MatTableModule} from '@angular/material/table';
import {AuthGuard} from './auth/auth.guard';
import { HeaderComponent } from './header/header.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    TransactionComponent,
    ProfileComponent,
    HeaderComponent,
    EditTransactionComponent,
    DialogDeleteTransaction
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule
  ],
  entryComponents: [DialogDeleteTransaction],
  providers: [CountriesService, UserService, AuthService, AuthGuard,   {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
