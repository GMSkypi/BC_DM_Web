import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class SessionExpiredInterceptor implements HttpInterceptor {

    constructor(private httpService : HttpService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(evt => {
                
            }),
            catchError((error: any) => {
                if(error instanceof HttpErrorResponse) {
                    console.log(error.error.message)
                }
                return throwError(error);
            }));
    }
}