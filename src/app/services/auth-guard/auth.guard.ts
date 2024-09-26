import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,private _router:Router){}

  // We can used this canActivate methods for check user login
  canActivate():boolean{
    const currentUser = this._authService.currentUserValue;
    if(currentUser){
      return true
    }
    this._router.navigate(['/login']);
    return false;
  }

  // canActivateAS(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
}
