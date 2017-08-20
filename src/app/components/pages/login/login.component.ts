import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { EmailValidator } from './../../../validators/email.validator';
import { AuthService } from './../../../services/auth/auth.service';
import { AlertService } from './../../../components/alert/alert.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  public progress:boolean= false;
  public loginForm = this.formBuilder.group({
    email: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required, EmailValidator.isValidMailFormat])),
    password: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required,Validators.minLength(5)]))
  });


  constructor(
      private notification:AlertService,
      private authService:AuthService,
      private router: Router,
      private formBuilder: FormBuilder

  ) {
  }

  ngOnInit() {
    if ( this.authService.userActivated() ) this.router.navigate(['/dashboard']);
  }

  public login(event) {
      event.preventDefault();
      this.progress = true;
      this.authService.getUser(this.loginForm.value)
                      .subscribe(
                          data => this.authService.setUser(data),
                          err => this.alert(err, 'error'),
                          () => this.redirect()
                      );
  }

  public redirect() {
      this.router.navigate(['/']);
      this.reset();
      this.progress = false;
  }

  public alert(data:any, type:string) {
    this.progress = false;
    this.reset();
    this.notification.alert(data.message, type);
  }

  public reset() {
    this.loginForm.reset();
  }

  public validation(field:string) {
      return (this.loginForm.controls[field].touched && this.loginForm.controls[field].dirty && !this.loginForm.controls[field].valid)
  }
}
