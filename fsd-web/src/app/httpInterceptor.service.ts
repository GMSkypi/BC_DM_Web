
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './login/authentication.service';
import { HttpService } from './http.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private httpService : HttpService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url == this.httpService.getUrl(this.httpService.loginUrl)){
            return next.handle(req);
        }
        else{
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: ''
                })
            });
            return next.handle(authReq);
        }
    }
}