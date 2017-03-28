import { Injectable } from '@angular/core';

import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class AlertService {

  constructor(
      private toastyService: ToastyService,
      private toastOptions: ToastOptions,
      private toastData: ToastData
   ) {
     this.toastOptions.theme = 'bootstrap';
     this.toastOptions.showClose = true;
     this.toastOptions.timeout = 5000;
  }

  public alert(message:string, type:string) {
    switch(type) {
       case 'success':
         this.success(message);
       break;
       case 'error':
         this.error(message);
       break;
       case 'info':
         this.info(message);
       break;
       case 'warning':
         this.warning(message);
       break;
       case 'wait':
         this.wait(message);
       break;
       default:
        this.default(message);
    }

  }

  public success(message:string, title:string = 'Successo') {
    this.toastOptions.title = title;
    this.toastOptions.msg = message;
    this.toastyService.success(this.toastOptions);
  }

  public error(message:string, title:string = 'Falha') {
    this.toastOptions.title = title;
    this.toastOptions.msg = message;
    this.toastyService.error(this.toastOptions);
  }

  public info(message:string, title:string = 'Informação') {
    this.toastOptions.title = title;
    this.toastOptions.msg = message;
    this.toastyService.info(this.toastOptions);
  }

  public warning(message:string, title:string = 'Aviso') {
    this.toastOptions.title = title;
    this.toastOptions.msg = message;
    this.toastyService.warning(this.toastOptions);
  }

  public wait(message:string, title:string = 'Aguarde') {
    this.toastOptions.title = title;
    this.toastOptions.msg = message;
    this.toastyService.wait(this.toastOptions);
  }

  public default(message:string, title:string = 'Alerta') {
    this.toastOptions.title = title;
    this.toastOptions.msg = message;
    this.toastyService.default(this.toastOptions);
  }



}
