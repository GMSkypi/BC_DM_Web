import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from './login/authentication.service';
import { MatDialog } from '@angular/material';
import { ErrorPopUpComponent } from 'src/popUp/errorPopUp/errorPopUp.component';
import { UnauthorizedPopUpComponent } from 'src/popUp/unauthorizedPopUp/unauthorizedPopUp.component';

@Injectable()
export class SessionExpiredInterceptor implements HttpInterceptor {

    constructor(private httpService : HttpService,
        private auth: AuthenticationService,
        public dialog: MatDialog,) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url == this.httpService.getUrl(this.httpService.loginUrl) || 
        req.url == this.httpService.getUrl(this.httpService.tryloginUrl)){
            return next.handle(req);
        }
        else{
            return next.handle(req).pipe(
                tap(evt => {
                    
                }),
                catchError((error: any) => {
                    if(error instanceof HttpErrorResponse) {
                        console.log(error.error.message)
                    }
                    if(this.auth.isLoggedIn && error.error.status === 401){
                        const dialogRef = this.dialog.open(UnauthorizedPopUpComponent,)
                    }

                    return throwError(error);
                }));
        }
    }
}