import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';


@Injectable()
export class UserService {
  private users: {} = [];
  constructor(private  http: HttpClient, private Auth: AuthService) { }
  baseURL = 'http://localhost:3000/api/users/' ;

  setUser(user: {}) {
    this.users = user;
  }

  getUsers() {
    return this.users;
  }

  createUser(user: object): Observable<any> {
    return  this.http.post<object>(this.baseURL + 'create-user', user).
    pipe(catchError(this.handleError));
  }

  getUserdata(): Observable<any> {
    return  this.http.get<any>(this.baseURL + 'getUserData').
    pipe(catchError(this.handleError), tap( userData => {
      this.setUser(userData);
    }));
  }

  deleteUser(user: object): Observable<any> {
    return this.http.post<any>(this.baseURL + 'deleteUser' , user).pipe(catchError(this.handleError));
  }

  logOutUser(): Observable<any> {
    return this.http.post<any>(this.baseURL + 'logout' , { } );
  }

  UpdateUser(user: object): Observable<any> {
    return this.http.post<any>(this.baseURL + 'update-user' , user).pipe(catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = ' ';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error);
  }
}
