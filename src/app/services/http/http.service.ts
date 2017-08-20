import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

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
      let headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getBearerToken()});
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
      return this.http.get(`${this.endpoint}/${path}`, this.getHerders(query))
                      .map(this.mapHandle)
                      .catch(this.catchHandle);
  }

  public post(path:string, params:any = {}, query:any= {}):Observable<Response> {
      return this.http.post(`${this.endpoint}/${path}`, JSON.stringify(params), this.getHerders(query))
                      .map(this.mapHandle)
                      .catch(this.catchHandle);
  }

  public upload(path:string, data:FormData, query:any= {}):Observable<Response> {
      let headers = new Headers({
          'Authorization': this.getBearerToken()
      });
      let requestOptions = { headers, params: this.queryParameters(query) };

      return this.http.post(`${this.endpoint}/${path}`, data, new RequestOptions(requestOptions))
                      .map(this.mapHandle)
                      .catch(this.catchHandle);
  }

  public patch(path:string, params:any = {}, query:any= {}):Observable<Response> {
      return this.http.patch(`${this.endpoint}/${path}`, JSON.stringify(params), this.getHerders(query))
                      .map(this.mapHandle)
                      .catch(this.catchHandle);
  }

  public put(path:string, params:any = {}, query:any= {}):Observable<Response> {
      return this.http.put(`${this.endpoint}/${path}`, JSON.stringify(params), this.getHerders(query))
                      .map(this.mapHandle)
                      .catch(this.catchHandle);
  }

  public delete(path:string, query:any= {}):Observable<Response> {
    return this.http.delete(`${this.endpoint}/${path}`, this.getHerders(query))
                    .map(this.mapHandle)
                    .catch(this.catchHandle);
  }

  private mapHandle(response:Response) {
      let body = response.json();
      return body || {};
  }

  private catchHandle(error:Response | any) {
      let data:any = {};
      if ( error instanceof Response ) {
          let body = error.json() || error.text();
          data.message = body.message;
          data.statusError = error.statusText;
          data.code = error.status;
      } else {
          data.message = error.message ? error.message : error.toString();
          data.statusError = null;
          data.code = null;
      }
      
      if ( data.code == 401 ) {
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
      }

      if (! environment.production ) {
          console.error(data);
      }

      return Observable.throw(data);
   }
}
