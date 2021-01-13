import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../services/user.service';
import {AuthService} from '../services/auth.service';
import {TransactionsService} from '../services/transactions.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

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
  TransactionId;

  constructor(private userService: UserService,
              private authService: AuthService,
              private transactionsService: TransactionsService,
              private router: Router,
              public dialog: MatDialog) {

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
