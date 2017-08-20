import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { EmailValidator } from './../../../validators/email.validator';
import { AuthService } from './../../../services/auth/auth.service';
import { AlertService } from './../../../components/alert/alert.service';

@Component({
  templateUrl: 'forget.password.component.html'
})
export class ForgetPasswordComponent implements OnInit {

  public progress:boolean=false;
  public forgetForm = this.formBuilder.group({
    email: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required, EmailValidator.isValidMailFormat])),
  });

  constructor(
      private notification:AlertService,
      private authService:AuthService,
      private router: Router,
      private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
  }

  public recover(event) {
      event.preventDefault();
      this.progress = true;
      this.authService.recoverPassword(this.forgetForm.value)
                      .subscribe(
                          data => this.alert(data, 'success'),
                          err => this.alert(err, 'error')
                      );
  }

  public alert(data:any, type:string) {
    this.progress = false;
    this.notification.alert(data.message, type);

    if (type == 'success') {
        this.reset();
    }
  }

  public reset() {
      this.forgetForm.reset();
  }

  public validation(field:string) {
      return (this.forgetForm.controls[field].touched && this.forgetForm.controls[field].dirty && !this.forgetForm.controls[field].valid)
  }
}
