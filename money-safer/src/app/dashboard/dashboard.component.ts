import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {TransactionsService} from '../services/transactions.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // declarying table columns and datasource
  displayedColumns: string[] = ['id', 'Transaction type', 'Transaction category', 'amount', 'edit'];
  dataSource ;

  constructor(private userService: UserService,
              private authService: AuthService,
              private transactionsService: TransactionsService,
              private router: Router) {

    this.dataSource =  this.transactionsService.getTransactions();
    console.log(this.dataSource );
  }

  ngOnInit() {

  }


  updateTransaction(el) {
    console.log(el)
   // this.testThat = el;
    this.transactionsService.setSingleTransaction(el);
    this.router.navigate(['/edit-transaction']);
  }
}
