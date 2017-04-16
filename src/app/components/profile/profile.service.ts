import { Injectable } from '@angular/core';

import { HttpService } from './../../services/http/http.service';

@Injectable()
export class ProfileService {

  constructor(private http: HttpService) {}

}
