import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileService } from './../profile.service';
import { AlertService } from './../../../components/alert/alert.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

    public progress:boolean = false;

    public profileForm = this.formBuilder.group({
        first_name: new FormControl({value: null, disabled: this.progress},
        Validators.compose([Validators.required])),
        last_name: new FormControl({value: null, disabled: this.progress},
        Validators.compose([Validators.required])),
        phone: new FormControl({value: null, disabled: this.progress},
        Validators.compose([Validators.maxLength(12)]))
    });

    constructor(
        private notification:AlertService,
        private profile: ProfileService,
        private router: Router,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
    }

    public saveProfile(event) {
      event.preventDefault();
      this.progress = true;
    //   this.profile.saveProfile(this.profileForm.value)
    //                   .subscribe(
    //                       data => this.alert(data.json(), 'success'),
    //                       err => this.alert(err.json(), 'error')
    //                   );
    }

    public validation(field:string) {
        return (this.profileForm.controls[field].touched && this.profileForm.controls[field].dirty && !this.profileForm.controls[field].valid)
    }
}
