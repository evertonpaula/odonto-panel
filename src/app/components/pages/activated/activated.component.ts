import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { AuthService } from './../../../services/auth/auth.service';

@Component({
  templateUrl: 'activated.component.html'
})
export class ActivatedComponent implements OnInit {

  public data:Object = {
      title: "Aguardando ... ",
      message: "",
      error: null
  };

  constructor(
      private authService:AuthService,
      private router:Router,
      private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
      let token = this.route.snapshot.params['token'];
      this.authService.activatedAccount({token})
                      .subscribe(
                          data => this.alert(data, 'success'),
                          err => this.alert(err, 'error')
                      );
  }

  public alert(data:any, type:string) {
      this.data = {
        title: type == 'error' ? 'Falha ao tentar ativar conta' : 'Ativação de conta efetuada com sucesso',
        message: data.message,
        error: type == 'error' ? true : false
    };
  }

}
