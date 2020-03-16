import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SessionExpiredInterceptor implements HttpInterceptor {

    constructor(private httpService : HttpService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            tap(
              error => {
                //logging the http response to browser's console in case of a failuer
                if (event instanceof HttpResponse) {
                  console.log("api call error :", event);
                }
              }
            )
          );
    }
}