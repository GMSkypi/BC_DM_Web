import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService, UserDetail } from './login/user.service';
import { Product, Pagable } from './main/search/searchResult/searchResult.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  sortCommonSuffix = '&sortDir=asc&sort=id';
  sortClientSuffix = '&sortDir=asc&sort=surname';

  baseUrl = 'http://localhost:8080'

  loginUrl = '/login'
  logoutUrl = '/logout'
  tryloginUrl = '/isauthorized'
  productFindUrl = '/product/productinfo/'

  constructor (private http : HttpClient) { }

  getUrl(url : String){
    return this.baseUrl + url
  }
  login(auth){
    return this.http.get<UserDetail>(this.getUrl(this.loginUrl),  { headers: { authorization: auth }, withCredentials:true,observe: 'response'})
  }
  logout(){
    return this.http.get(this.getUrl(this.logoutUrl),{withCredentials: true,observe: 'response'})
  }
  tryLogin(){
    return this.http.get<UserDetail>(this.getUrl(this.tryloginUrl),{withCredentials: true,observe: 'response'})
  }
  productFind(requestBody){
    return this.http.post<Pagable<Product>>(this.getUrl(this.productFindUrl) + '?page=0&size=10&sortDir=asc&sort=id',requestBody,{withCredentials: true,observe: 'response'} )
  }
}
