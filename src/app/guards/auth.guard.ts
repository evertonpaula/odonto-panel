import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>|boolean{
    if ( this.authService.userActivated() ) return true;

    this.router.navigate(['/login']);

    return false;
  }

}
