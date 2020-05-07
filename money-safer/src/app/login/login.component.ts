import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogForm: FormGroup;

  userObject = {
    email: String,
    password: String,
  };
  errorMessages: { [key: string]: string } = {
    email: 'Invalid mail',
    password: 'Invalid Password',
  };

ngOnInit(): void {
  // Redirect when login
  if (this.authService.IsLogged()) {
    this.router.navigate(['/dashboard']);
  }

}

  constructor(
    private formBuilder: FormBuilder,
    private  router: Router,
    private authService: AuthService
  ) {
    this.createForm();
  }

  createForm() {
    this.userLogForm = this.formBuilder.group({
      emailGroup: this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]]
      }),
      passwordGroup: this.formBuilder.group({
        password: ['', [
          Validators.required,
          Validators.minLength(8),
        ]],
      })
    });
  }

  Log_in(): void {
    // API call to register your user
  this.userObject.password = this.userLogForm.value.passwordGroup.password;
  this.userObject.email = this.userLogForm.value.emailGroup.email;
  this.authService.loginUser(this.userObject).subscribe(resolve => {
    console.log(resolve);
    this.authService.setToken(resolve.token);
    this.router.navigate(['/dashboard']);

  }, error => {
    console.log(error);
  });

  }

}
