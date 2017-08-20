import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from './../../models/user';
import { HttpService } from './../http/http.service'

@Injectable()
export class AuthService {

  private user:User;

  constructor( private http:HttpService) {
      if ( this.userActivated ) {
          this.user = JSON.parse(localStorage.getItem('currentUser'));
      }
  }

  public userActivated() {
      if (localStorage.getItem('token') !== null && localStorage.getItem('currentUser') !== null) return true;
      return false;
  }

  public locked() {
      localStorage.removeItem('token');
  }

  public getUserData() {
      return this.user;
  }

  public setUser(data:any) {
      let response = data.data;
      this.user = response.user;
      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(this.user));
  }

  public removeCredentials() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  public getUser(params:any) {
    return this.http.post('login', params);
  }

  public registerUser(params:any)  {
    return this.http.post('sing-up', params);
  }

  public recoverPassword(params:any) {
      return this.http.post('forget-password', params);
  }

  public activatedAccount(params:any) {
      return this.http.patch('activated', params);
  }

  public getTokenForRecover(params:any) {
      return this.http.get(`recover/${params.token}`);
  }

  public updatePassword(params:any) {
      return this.http.put('recover', params );
  }

}
