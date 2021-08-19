import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenStorageService
  ) {}
  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.tokenService.isUserLoggedIn())
      return true;
    // bắt buộc phải login
    this.router.navigate(['login']);
    return false;
  }

}
