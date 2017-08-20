import { Injectable } from '@angular/core';

import { HttpService } from './../../services/http/http.service';
import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../models/user';

@Injectable()
export class ProfileService {

  public user:User;

  constructor (private http: HttpService, private auth: AuthService ) {
      this.user = this.auth.getUserData();
  }

  public get() {
      let resource:string = `user/${this.user.id}/perfil`;
      return this.http.get(resource);
  }

  public save(params:any) {
      let resource:string = `user/${this.user.id}/perfil`;
      return this.http.post(resource, params);
  }

}
