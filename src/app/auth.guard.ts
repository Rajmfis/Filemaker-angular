import {CanActivate, UrlTree,Router,ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
constructor(private authService:AuthService,private router: Router){}

canActivate() {
    if (localStorage.getItem('users')){
      return true;
    }else {
      alert("You don't have permission to view this page. Please login");
      this.router.navigate(['login']);//navigating to the home page
      return false;
    };
    
  
  // console.log("in canactivate");
  return true;

}
}