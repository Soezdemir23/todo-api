import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
// the CanActivate is deprecated, what else can I use? //
export class AuthGuard implements CanActivate {
  constructor(private apiservice: ApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.apiservice.jwtUserToken.pipe(
      map((result: string) => !!result),
      tap((result) => {
        if (!result) {
          this.router.navigate(['/login']).then();
          return result;
        }
        return result;
      })
    );
  }
}
