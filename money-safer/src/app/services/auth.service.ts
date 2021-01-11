import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {User} from '../models/user';
export const TOKEN_NAME = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(private  http: HttpClient) { }
  baseURL = 'http://localhost:3000/api/users/' ;


  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  removeToken(): boolean {
    localStorage.removeItem(TOKEN_NAME);
    return true;
  }

  IsLogged(): boolean {
    if (localStorage.getItem(TOKEN_NAME)) {
     return  true;
    } else {
      return  false;
    }
  }
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  loginUser(user: object): Observable<any> {
    return  this.http.post<any>(this.baseURL + 'login' , user)
      .pipe(
        catchError(this.handleError) , tap(resData => {
          // tslint:disable-next-line:no-shadowed-variable
          const user = new User(
            resData.username,
            resData.email,
            resData.first_name,
            resData.last_name,
            resData.adress,
            this.getTokenExpirationDate(resData.token),
            resData.token
          );
          this.user.next(user);
          console.log(resData)
          this.setToken(resData.token);
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
