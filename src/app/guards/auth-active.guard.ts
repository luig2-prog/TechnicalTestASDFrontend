import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthActiveGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    const user = this.authService.getCurrentUser();

    if (user && user.expiration) {
        if (moment() < moment(user.expiration)) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    if(user && user.setPassword) {
      this.router.navigate(['/user/set-passowrd']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
