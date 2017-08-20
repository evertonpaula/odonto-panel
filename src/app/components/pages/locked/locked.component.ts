import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AuthService } from './../../../services/auth/auth.service';
import { AlertService } from './../../../components/alert/alert.service';

@Component({
  templateUrl: 'locked.component.html'
})
export class LockedComponent implements OnInit {

  public progress:boolean=false;
  public lockedForm = this.formBuilder.group({
    email: new FormControl({value: null, disabled: this.progress}),
    password: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required,Validators.minLength(5)]))
  });

  constructor(
      private notification:AlertService,
      private authService:AuthService,
      private location: Location,
      private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.authService.locked();
    let user = this.authService.getUserData();

    if ( user )
        this.lockedForm.controls['email'].patchValue(user.email);
    else
        this.location.back();
  }

  public locked(event) {
      event.preventDefault();
      this.progress = true;
      this.authService.getUser(this.lockedForm.value)
                      .subscribe(
                          data => this.authService.setUser(data),
                          err => this.alert(err, 'error'),
                          () => this.redirect()
                      );
  }

  public redirect() {
      this.location.back();
      this.progress = false;
  }

  public alert(data:any, type:string) {
    this.progress = false;
    this.notification.alert(data.message, type);
  }

  public validation(field:string) {
      return (this.lockedForm.controls[field].touched && this.lockedForm.controls[field].dirty && !this.lockedForm.controls[field].valid)
  }
}
