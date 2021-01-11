import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  userData;
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(private authService: AuthService,
              private userService: UserService,
              private  router: Router) {
    this.userData = this.userService.getUsers();
    this.userService.getUserdata().subscribe(resolve => {
      this.userData = resolve;
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.userSub =  this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user ;
    });
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  Logout() {
    this.userService.logOutUser( ).subscribe(resolve => {
      // tslint:disable-next-line:triple-equals
      this.authService.removeToken();
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }
}
