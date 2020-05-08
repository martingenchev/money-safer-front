import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {

  constructor( private userService: UserService) { }
  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any>
           | Promise<any> | any {

    return this.userService.getUserdata();

  }
}
