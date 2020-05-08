import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from "@angular/forms";
import {ErrorStateMatcher} from '@angular/material/core';
import {CountriesService} from '../services/countries.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userRegistrationForm: FormGroup;
  countriesList;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
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
  regExps: { [key: string]: RegExp } = {
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
  };

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private userService: UserService,
    private  router: Router ,
  ) {
    this.createForm();
  }
  ngOnInit(): void {
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
      emailGroup: this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        confirmEmail: ['', Validators.required]
      }, { validator: CustomValidators.childrenEqual}),
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

  register(): void {
    // API call to register your user
    console.log(this.userRegistrationForm.value);

    this.userObject.username = this.userRegistrationForm.value.userName;
    this.userObject.first_name = this.userRegistrationForm.value.nameGroup.firstName;
    this.userObject.last_name = this.userRegistrationForm.value.nameGroup.lastName;
    this.userObject.password = this.userRegistrationForm.value.passwordGroup.password;
    this.userObject.email = this.userRegistrationForm.value.emailGroup.email;
    this.userObject.adress = this.userRegistrationForm.value.adress;
    this.userObject.country_id = this.userRegistrationForm.value.country_id;

    console.log(this.userObject);
    this.userService.createUser(this.userObject).subscribe(resolve => {
      console.log(resolve);
      this.router.navigate(['/login']);
    },  error => {
      console.log(error);
    })
  }

}
export class CustomValidators {
  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : { childrenNotEqual: true };
  }
}
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}
