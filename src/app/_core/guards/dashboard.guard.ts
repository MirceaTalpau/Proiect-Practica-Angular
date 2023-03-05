import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if(localStorage.getItem('username') && localStorage.getItem('token') || sessionStorage.getItem('username') && sessionStorage.getItem('token')){
      return true;
    }else{
      this.router.navigate(['auth'])
      return false;
    }
    
  }

  
}
