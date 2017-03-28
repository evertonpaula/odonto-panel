import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

import { environment } from './../../../environments/environment';

@Injectable()
export class HttpService {

  private endpoint:string;

  constructor( private http:Http) {
      this.endpoint = environment.endpoint;
  }

  private getBearerToken() {
      return `Bearer ${localStorage.getItem('token')}`;
  }

  public getHerders(params:any = {}) {
      let headers = new Headers({'Content-Type': 'application/json', 'Authorizarion': this.getBearerToken()});
      let requestOptions = { headers, params: this.queryParameters(params) };
      return new RequestOptions(requestOptions);
  }

  public queryParameters(params:any):URLSearchParams {
      let urlSearchParams = new URLSearchParams();
      for ( let key in params) {
            urlSearchParams.set(key,params[key]);
      }
      return urlSearchParams;
  }

  public get(path:string, query:any = {}):Observable<Response> {
      return this.http.get(`${this.endpoint}/${path}`, this.getHerders(query));
  }

  public post(path:string, params:any = {}, query:any= {}):Observable<Response> {
      return this.http.post(`${this.endpoint}/${path}`, JSON.stringify(params), this.getHerders(query));
  }

  public patch(path:string, params:any = {}, query:any= {}):Observable<Response> {
      return this.http.patch(`${this.endpoint}/${path}`, JSON.stringify(params), this.getHerders(query));
  }

  public put(path:string, params:any = {}, query:any= {}):Observable<Response> {
      return this.http.put(`${this.endpoint}/${path}`, JSON.stringify(params), this.getHerders(query));
  }

  public delete(path:string, query:any= {}):Observable<Response> {
    return this.http.delete(`${this.endpoint}/${path}`, this.getHerders(query));
  }
}
