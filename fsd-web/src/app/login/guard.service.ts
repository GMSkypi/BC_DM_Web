import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private auth: AuthenticationService, 
    private router: Router,
    private userService: UserService,
) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log("canActivate")
        //debugger
        if(this.auth.isLoggedIn) {
          return true
        }
        return this.auth.tryLogin().toPromise().then((res) => {
          this.auth.setLoggedIn(true);
          this.userService.userDetail = res.body
          return true
        }).catch((error) => {
          if(error.status == 401){
            this.router.navigate(['login']);
            return false;
          }
          console.log(error)
          this.router.navigate(['login']);
          return false;
          })
    }
    
}
