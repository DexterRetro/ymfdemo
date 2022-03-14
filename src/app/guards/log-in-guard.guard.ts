import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServiceService } from '../services/users-service.service';

@Injectable({
  providedIn: 'root'
})
export class LogInGuardGuard implements CanActivate {
  constructor(private user:UsersServiceService, private router:Router){}
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.user.isAuthenticated){
      return true;
    }else{
      if(this.user.getToken()){
        console.log(this.user.getToken())
        this.router.navigateByUrl('/member/authenticate');
      }else{
        this.router.navigateByUrl('/member/logIn');
      }
      return false;
    }

  }

}
