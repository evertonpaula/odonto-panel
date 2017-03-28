import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

//Modules
import { AlertModule } from './../alert/alert.module';
import { SharedModule } from './../../shared/shared.module';
import { EqualValidator } from './../../validators/equal.validator';
import { p404Component } from './404.component';
import { p500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { LockedComponent } from './locked.component';
import { ActivatedComponent } from './activated.component';
import { RecoverPasswordComponent } from './recover.password.component';
import { ForgetPasswordComponent } from './forget.password.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, PagesRoutingModule, AlertModule, SharedModule ],
  declarations: [
    p404Component,
    p500Component,
    LoginComponent,
    RegisterComponent,
    LockedComponent,
    ForgetPasswordComponent,
    ActivatedComponent,
    RecoverPasswordComponent,
    EqualValidator
  ],
  exports: [PagesRoutingModule]
})
export class PagesModule { }
