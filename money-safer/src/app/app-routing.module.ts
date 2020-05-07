import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {TransactionComponent} from './transaction/transaction.component';
import {AuthGuard} from './auth/auth.guard';
import {TransactionResolverService} from './dashboard/transaction-resolver.service';
import {UserResolverService} from './header/user-resolver.service';
import {HeaderComponent} from './header/header.component';
import {EditTransactionComponent} from "./edit-transaction/edit-transaction.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }, {
    path: '',
    component: HeaderComponent,
    resolve: [UserResolverService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
   path: 'sign-up',
   component: SignUpComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: [TransactionResolverService]
  },
  {
    path: 'transactions',
    component: TransactionComponent,
    canActivate: [AuthGuard]
  },
  {path: 'edit-transaction',
  component: EditTransactionComponent ,
  canActivate: [AuthGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: [UserResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
