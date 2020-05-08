import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import {CustomValidators} from '../sign-up/sign-up.component';
import {ErrorStateMatcher} from '@angular/material/core';
import {CountriesService} from '../services/countries.service';
import {Router} from "@angular/router";

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
    newPassword: String,
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
               private formBuilder: FormBuilder,
               private  router: Router) {
             this.userData = this.userService.getUsers();
             this.createForm();
             console.log(this.userData);
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
      userName: [this.userData.username, [
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      nameGroup: this.formBuilder.group({
        firstName: [this.userData.first_name, [
          Validators.minLength(1),
          Validators.maxLength(50)
        ]],
        lastName: [this.userData.last_name, [
          Validators.minLength(1),
          Validators.maxLength(50)
        ]],
      }),
      Oldpassword: ['', [
        Validators.required,
        Validators.minLength(6),
        // Validators.pattern(this.regExps.password)
      ]],
      passwordGroup: this.formBuilder.group({
        password: ['', [
          Validators.required,
          // Validators.pattern(this.regExps.password)
        ]],
        confirmPassword: ['', Validators.required]
      }, { validator: CustomValidators.childrenEqual}),
      adress: [this.userData.adress, [
        Validators.minLength(5),
      ]],
      country_id: [this.userData.Country.id, [ ]]
    });
  }

  updateUser() {
    console.log(this.userRegistrationForm.value);

    this.userObject.username = this.userRegistrationForm.value.userName;
    this.userObject.first_name = this.userRegistrationForm.value.nameGroup.firstName;
    this.userObject.last_name = this.userRegistrationForm.value.nameGroup.lastName;
    this.userObject.password = this.userRegistrationForm.value.passwordGroup.password;
    this.userObject.newPassword = this.userRegistrationForm.value.Oldpassword
    this.userObject.adress = this.userRegistrationForm.value.adress;
    this.userObject.country_id = this.userRegistrationForm.value.country_id;

    this.userService.UpdateUser(this.userObject).subscribe( resolve =>{
      console.log(resolve);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
    });
  }


}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}
