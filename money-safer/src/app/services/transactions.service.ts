import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private  http: HttpClient, private Auth: AuthService) { }
  baseURL = 'http://localhost:3000/api/transactions/' ;
  private transactions: [] = [];
  private singleTransaction;

  setSingleTransaction(transactionObject) {
    this.singleTransaction = transactionObject;
  }

  getSingleTransaction() {
    return this.singleTransaction;
  }
  setTransactions(recipes: []) {
    this.transactions = recipes;
  }

  getTransactions() {
    return this.transactions.slice();
  }

  getTransactionCategories(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'transaction-categories').pipe(catchError(this.handleError));
  }

  createTransaction(user: object): Observable<any> {
    return  this.http.post<any>(this.baseURL + 'create-transaction' , user ).pipe(catchError(this.handleError));
  }

  getAllTransaction(): Observable<any> {
    return this.http.get<any>(this.baseURL + 'all-transaction').
    pipe(catchError(this.handleError), tap(transactions => {
      this.setTransactions(transactions);
    }));
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
