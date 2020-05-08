import { Component, OnInit , Input} from '@angular/core';
import {TransactionsService} from "../services/transactions.service";

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  constructor(private transactionsService: TransactionsService) { }


  ngOnInit() {
    console.log(this.transactionsService.getSingleTransaction());
  }




}
