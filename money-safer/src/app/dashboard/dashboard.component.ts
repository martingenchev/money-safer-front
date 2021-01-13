import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {TransactionsService} from '../services/transactions.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ChartType, ChartOptions  } from 'chart.js';
import { MultiDataSet, Label,  } from 'ng2-charts';


class DialogData {
  id: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // declarying table columns and datasource
  displayedColumns: string[] = ['Id', 'Transaction Category', 'createdAt', 'Transaction type', 'Amount',  'menu'];
  dataSource ;
  private pieChartData: (any | number)[];
  private IncomeTransaction;
  private OutcomeTransaction: any[];

  constructor(private userService: UserService,
              private authService: AuthService,
              private transactionsService: TransactionsService,
              private router: Router,
              public dialog: MatDialog) {

    this.dataSource =  this.transactionsService.getTransactions();
    console.log(this.dataSource );

  }
  // pie chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    }
  };
  public pieChartLabels = ['Salary', 'Rent', 'Savings', 'Housing', 'Utilities', 'Transportation', 'Entertainment', 'Other'];
  public pieChartType = 'pie';


  // bar chart

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2019', '2020', '2021'];
  public barChartType = 'bar';
  public barChartLegend = true;
  private barChartData;

  ngOnInit() {
    this.pieChartData = [
      this.filterTransactionAndSum(this.dataSource, 'Salary'),
      this.filterTransactionAndSum(this.dataSource, 'Rent'),
      this.filterTransactionAndSum(this.dataSource, 'Savings'),
      this.filterTransactionAndSum(this.dataSource, 'Housing'),
      this.filterTransactionAndSum(this.dataSource, 'Utilities'),
      this.filterTransactionAndSum(this.dataSource, 'Transportation'),
      this.filterTransactionAndSum(this.dataSource, 'Entertainment'),
      this.filterTransactionAndSum(this.dataSource, 'Other'),
      ];
    this.IncomeTransaction = this.FilterTransactionsByCategory(this.dataSource, true);
    this.OutcomeTransaction = this.FilterTransactionsByCategory(this.dataSource, false);
    this.barChartData = [
      {data: [
          this.filterTransactionsByYearAndSum(this.IncomeTransaction, 2019),
          this.filterTransactionsByYearAndSum(this.IncomeTransaction, 2020),
          this.filterTransactionsByYearAndSum(this.IncomeTransaction, 2021)
        ], label: 'Income'},
      {data: [
          this.filterTransactionsByYearAndSum(this.OutcomeTransaction, 2019),
          this.filterTransactionsByYearAndSum(this.OutcomeTransaction, 2020),
          this.filterTransactionsByYearAndSum(this.OutcomeTransaction, 2021)
        ], label: 'Outcome'}
    ];
  }

  filterTransactionAndSum(arrayToFilter: Array<any>, categoryType: string) {
    const valuesArray = [];
    const filteredArray = arrayToFilter.filter( transaction => {
     if (transaction.Transactions_category.category_name === categoryType) {
       valuesArray.push(transaction.amount);
     }
    });
    const sumedValues = this.sumCategoryValues(valuesArray)
    return sumedValues;
  }

  sumCategoryValues(ValuesArray: Array<number>) {
    const sum = ValuesArray.reduce((a, b) => {
      return a + b;
    }, 0);
    return sum;
  }

  FilterTransactionsByCategory(arrayToFilter: Array<any>, transactionType: boolean) {
    const filteredArray = arrayToFilter.filter( transaction => {
     return transaction.transaction_type === transactionType;
    });
    return filteredArray;
  }

  filterTransactionsByYearAndSum(arrayToFilter: Array<any>, yearToFilter: number) {
    const valuesArray = [];
    const yearTransactions = arrayToFilter.filter(transaction => {
      const [year, month] = transaction.createdAt.split('-'); // Or, var month = e.date.split('-')[1];
      if (year == yearToFilter) {
        valuesArray.push(transaction.amount);
      }
    });
    const sumedValues = this.sumCategoryValues(valuesArray)
    return sumedValues;
  }

  updateTransaction(el) {
    console.log(el)
   // this.testThat = el;
    this.transactionsService.setSingleTransaction(el);
    this.router.navigate(['/edit-transaction']);
  }

  openDialog(TransactionId): void {
    const dialogRef = this.dialog.open(DialogDeleteTransaction, {
      width: '250px',
      data: {id: TransactionId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', TransactionId);

    });
  }
}

@Component({
  selector: 'dialog-delete-transaction',
  templateUrl: 'dialog-delete-transaction.html',
})
export class DialogDeleteTransaction {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteTransaction>,
    private transactionsService: TransactionsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteTransaction(TransactionID) {

    this.transactionsService.deleteTransaction({id: TransactionID}).subscribe(resolve => {
      console.log(resolve);
      this.dialogRef.close();
    }, error => {
      console.log(error);
    })
  }
}
