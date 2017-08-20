import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ProfileService } from './../profile.service';
import { AlertService } from './../../../components/alert/alert.service';
import { Profile } from './../../../models/profile';

@Component({
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

    public progress:boolean = false;
    public profile:Profile = new Profile();
    public profileForm:FormGroup;

    constructor(
        private notification:AlertService,
        private profileService: ProfileService,
        private formBuilder: FormBuilder
    ) {
        this.builder();
    }

    ngOnInit() {
        this.getProfile();
    }

    public uploadOnResponse(event) {
        this.alert(event, 'success');
    }

    public getProfile() {
        this.profileService.get().subscribe(
            response =>  this.setProfile(response),
            err      =>  this.alert(err, 'error')
        );
    }

    public setProfile(response:any) {
        this.profile = <Profile>response.data.perfil;
    }

    public saveProfile(event) {
      event.preventDefault();
      this.progress = true;
      console.log(this.profile);
      this.profileService.save(this.profile)
                         .subscribe(
                             response => this.alert(response, 'success'),
                             err      => this.alert(err, 'error')
                         );
    }

    public validation(field:string) {
        return (this.profileForm.controls[field].touched && this.profileForm.controls[field].dirty && !this.profileForm.controls[field].valid)
    }

    public alert(data:any, type:string) {
        this.notification.alert(data.message, type);
    }

    protected builder() {
        this.profileForm = this.formBuilder.group({
            first_name: new FormControl({disabled: this.progress},
            Validators.compose([Validators.required])),
            last_name: new FormControl({disabled: this.progress},
            Validators.compose([Validators.required])),
            phone: new FormControl({disabled: this.progress},
            Validators.compose([Validators.required])),
            address_type: new FormControl({disabled: this.progress},
            Validators.compose([Validators.minLength(5)])),
            logradouro: new FormControl({disabled: this.progress},
            Validators.compose([Validators.minLength(5)])),
            city: new FormControl({disabled: this.progress},
            Validators.compose([Validators.minLength(5)])),
            zipcode: new FormControl({disabled: this.progress},
            Validators.compose([Validators.minLength(5)])),
            country: new FormControl({disabled: this.progress},
            Validators.compose([Validators.minLength(5)])),
        });
    }
}
