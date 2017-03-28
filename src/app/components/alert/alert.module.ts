import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastyModule, ToastOptions, ToastData } from 'ng2-toasty';
import { AlertService } from './alert.service';
import { AlertComponent } from './component/alert.component';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot()
  ],
  providers: [ AlertService, ToastOptions, ToastData ],
  declarations: [ AlertComponent ],
  exports: [ AlertComponent ]
})
export class AlertModule { }
