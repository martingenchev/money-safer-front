import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogForm: FormGroup;

  errorMessages: { [key: string]: string } = {
    email: 'Invalid mail',
    password: 'Invalid Password',
  };

ngOnInit(): void {
}

  constructor(
    private formBuilder: FormBuilder
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
console.log(this.userLogForm);
  }
}
