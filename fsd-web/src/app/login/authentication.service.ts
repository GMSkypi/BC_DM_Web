import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { debug } from 'util';
import { UserService, UserDetail } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


 private loggedInStatus = false

  constructor(private httpService : HttpService, private userService : UserService) {

  }

  authenticationService(username: String, password: String) {
    return this.httpService.login(this.createBasicAuthToken(username, password)).pipe(map((res) => {
        this.registerSuccessfulLogin();
        return res.body
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin() {
    this.loggedInStatus = true
  }

  logout() {
    return this.httpService.logout().toPromise().then((res) => {
      this.loggedInStatus = false
      return true
    }).catch((error) => {
      console.log(error)
      return false;
      })
  }

  tryLogin() {
    return this.httpService.tryLogin();
  }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

}
