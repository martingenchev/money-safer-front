import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.getToken()}`
          }
        });
        return next.handle(modifiedReq);
  }
}
