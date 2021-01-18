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
import { MenuComponent } from './menu/menu.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import {MatDialogModule} from '@angular/material/dialog';
import {TransactionsService} from './services/transactions.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule, ThemeService } from 'ng2-charts';
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    TransactionComponent,
    ProfileComponent,
    MenuComponent,
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
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    ChartsModule,
    MatButtonToggleModule
  ],
  entryComponents: [DialogDeleteTransaction],
  providers: [ThemeService, CountriesService, UserService, AuthService, AuthGuard, TransactionsService , {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
