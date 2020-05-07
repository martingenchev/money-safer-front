import {Component, OnInit, DoCheck, OnChanges} from '@angular/core';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'money-safer';

  constructor(private authService: AuthService,
              private userService: UserService,
              private  router: Router) {  }


  ngOnInit() {  }


}
