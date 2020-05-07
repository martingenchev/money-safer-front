import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from "@angular/forms";
import {CustomValidators} from "../sign-up/sign-up.component";
import {ErrorStateMatcher} from "@angular/material/core";
import {CountriesService} from "../services/countries.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData;
  userRegistrationForm: FormGroup;
  countriesList;

  userObject = {
    username: String,
    first_name: String,
    last_name: String,
    password: String,
    email: String,
    adress: String,
    country_id: Number
  };

  errorMessages: { [key: string]: string } = {
    fullName: 'Full name must be between 1 and 128 characters',
    name: 'Name should be 12 and 80 characters ',
    lastName: 'Last Name should be 12 and 80 characters ',
    email: 'Email must be a valid email address (username@domain)',
    confirmEmail: 'Email addresses must match',
    password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
    confirmPassword: 'Passwords must match',
    address: 'Address should be valid'
  };
  constructor( private userService: UserService,
               private countriesService: CountriesService,
               private formBuilder: FormBuilder) {
             this.createForm();
             this.userData = this.userService.getUsers();
             this.userService.getUserdata().subscribe(resolve => {
              this.userData = resolve;
              console.log(this.userData);
            }, err => {
              console.log(err);
            });
  }

  ngOnInit() {

    this.getCountries();
  }


  getCountries(): void {
    this.countriesService.getCountries().subscribe(data => {
      this.countriesList = data;
      console.log(data);
    }, error => {
      console.log('EBA MU MAMAMATA', error);
    });
  }

  createForm() {
    this.userRegistrationForm = this.formBuilder.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      nameGroup: this.formBuilder.group({
        firstName: ['', [
          Validators.minLength(1),
          Validators.maxLength(50)
        ]],
        lastName: ['', [
          Validators.minLength(1),
          Validators.maxLength(50)
        ]],
      }),
      passwordGroup: this.formBuilder.group({
        password: ['', [
          Validators.required,
          // Validators.pattern(this.regExps.password)
        ]],
        confirmPassword: ['', Validators.required]
      }, { validator: CustomValidators.childrenEqual}),
      adress: ['', [
        Validators.minLength(5),
      ]],
      country_id: ['', [
        Validators.required
      ]]
    });
  }

  updateUser() {

  }

  
}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}
