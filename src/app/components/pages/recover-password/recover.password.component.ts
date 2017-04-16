import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { EqualValidator } from './../../../validators/equal.validator';
import { EmailValidator } from './../../../validators/email.validator';
import { AuthService } from './../../../services/auth/auth.service';
import { AlertService } from './../../../components/alert/alert.service';


@Component({
  templateUrl: 'recover.password.component.html'
})
export class RecoverPasswordComponent implements OnInit {

  public progress:boolean = false;
  public validToken:boolean = false;
  public data:{title:string,message:string,error:any} = {
    title: 'Recuperação de senha',
    message: 'Validando conta ...',
    error: null
  }

  public recoverForm = this.formBuilder.group({
    token: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required])),
    email: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required, EmailValidator.isValidMailFormat])),
    password: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required, Validators.minLength(5)])),
    password_confirmation: new FormControl({value: null, disabled: this.progress}, Validators.compose([Validators.required, Validators.minLength(5)]))
  });

  constructor(
      private authService:AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder) {
  }

  ngOnInit() {
      let token = this.route.snapshot.params['token'];
      this.recoverForm.controls['token'].patchValue(token);
      this.authService.getTokenForRecover({token})
                      .subscribe(
                          data => this.getEmail(data.json()),
                          err => this.invalidToken(err.json())
                      );
  }

  public getEmail(data:any) {
      this.recoverForm.controls['email'].patchValue(data.data.email);
      this.data.message = data.message;
      this.validToken = true;
  }

  public invalidToken(data:any) {
      this.data ={
          title: "Falha ao verificar conta",
          message: data.message || 'Erro ao validar sua conta.',
          error: true
      };
      this.recoverForm.controls['email'].patchValue('');
      this.validToken = false;
  }


  public updatePassword(event) {
    event.preventDefault();
    this.progress = true;
    this.authService.updatePassword(this.recoverForm.value)
                    .subscribe(
                        data => this.alert(data.json(), 'success'),
                        err => this.alert(err.json(), 'error')
                    );
  }

  public reset() {
      this.recoverForm.reset();
  }

  public alert(data:any, type:string) {
      if (type == 'success') {
          this.data.error = false;
          this.validToken = true;
      } else {
          this.data.error = true;
          this.validToken = false;
      }
      this.data.message = data.message;
      this.progress = false;
      this.reset();
  }

  public validation(field:string) {
      return (this.recoverForm.controls[field].touched && this.recoverForm.controls[field].dirty && !this.recoverForm.controls[field].valid)
  }
}
