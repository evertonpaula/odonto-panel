import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { EqualValidator } from './../../../validators/equal.validator';
import { EmailValidator } from './../../../validators/email.validator';
import { AuthService } from './../../../services/auth/auth.service';
import { AlertService } from './../../../components/alert/alert.service';


@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  public progress:boolean = false;

  public registerForm = this.formBuilder.group({
    name: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required,Validators.minLength(5)])),
    email: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required, EmailValidator.isValidMailFormat])),
    password: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required, Validators.minLength(5)])),
    password_confirmation: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required, Validators.minLength(5)]))
  });

  constructor(
      private notification:AlertService,
      private authService:AuthService,
      private router: Router,
      private formBuilder: FormBuilder) {
  }

  public register(event) {
    event.preventDefault();
    this.progress = true;
    this.authService.registerUser(this.registerForm.value)
                    .subscribe(
                        data => this.alert(data.json(), 'success'),
                        err => this.alert(err.json(), 'error')
                    );
  }

  public reset() {
      this.registerForm.reset();
  }

  public alert(data:any, type:string) {
    this.progress = false;
    this.notification.alert(data.message, type);
    if (type == 'success') {
        this.reset();
    }
  }

  public validation(field:string) {
      return (this.registerForm.controls[field].touched && this.registerForm.controls[field].dirty && !this.registerForm.controls[field].valid)
  }
}
