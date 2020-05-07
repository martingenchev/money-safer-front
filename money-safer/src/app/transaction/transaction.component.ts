import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmValidParentMatcher} from '../sign-up/sign-up.component';
import {Router} from '@angular/router';
import {TransactionsService} from '../services/transactions.service';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactionForm: FormGroup;
  transactionCategoriesList;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  Transaction = {
    transaction_type: Boolean,
    amount: Number,
    transactions_category_id: Number
  };

  errorMessages: { [key: string]: string } = {
    transaction_type: 'Define the transaction type',
    amount: 'Insert amount of money at least one symbol ',
    transactions_category_id: 'Select Categories',
  };

  constructor(private formBuilder: FormBuilder,
              private transactionsService: TransactionsService,
              private  router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.getTransactionCategories();
  }

  getTransactionCategories(): void {
    this.transactionsService.getTransactionCategories().subscribe(data => {
      this.transactionCategoriesList = data;
    }, error => {
      console.log('Ko stane', error);
    });
  }

  createForm() {
    this.transactionForm = this.formBuilder.group({
      transactionType: ['', [
        Validators.required
      ]],
      amounts: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      transactionCategory: ['', [
        Validators.required
      ]]
    });
  }

  InsertTransaction(): void {
    this.Transaction.transaction_type = this.transactionForm.value.transactionType;
    this.Transaction.amount = this.transactionForm.value.amounts;
    this.Transaction.transactions_category_id = this.transactionForm.value.transactionCategory;

    this.transactionsService.createTransaction(this.Transaction).subscribe( data => {
      console.log(data);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
    });

  }

}
