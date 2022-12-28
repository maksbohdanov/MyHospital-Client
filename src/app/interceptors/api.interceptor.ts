import {Injectable} from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,
        HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {catchError,  Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  baseApiUrl = 'https://localhost:7260/api';

  constructor( private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({url: `${this.baseApiUrl}${request.url}`});
    
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {        
        console.log(err.message);
        return throwError(() => new Error(err.message));
      })
    );
  }
}
