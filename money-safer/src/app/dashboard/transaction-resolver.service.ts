import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TransactionsService} from '../services/transactions.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionResolverService implements Resolve<any> {
  constructor(private transactionsService: TransactionsService) {}
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any>
          | Promise<any> | any {
    return this.transactionsService.getAllTransaction();
  }
}
