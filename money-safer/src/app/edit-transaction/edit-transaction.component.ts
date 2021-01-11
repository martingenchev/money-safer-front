import { Component, OnInit , Input} from '@angular/core';
import {TransactionsService} from '../services/transactions.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmValidParentMatcher} from '../profile/profile.component';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  transactionForm: FormGroup;
  transactionCategoriesList;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  errorMessages: { [key: string]: string } = {
    transaction_type: 'Define the transaction type',
    amount: 'Insert amount of money at least one symbol ',
    transactions_category_id: 'Select Categories',
  };

  constructor(private transactionsService: TransactionsService,
              private formBuilder: FormBuilder) {
    this.createForm();
  }


  ngOnInit() {
    console.log(this.transactionsService.getSingleTransaction());
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


  updateTransaction() {

  }

}
