import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request) .pipe(
      map(res => {
          return res
      }),
      catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
              errorMsg = `Error: ${error.message}`;
          } else {
            if(error.error.message){
              errorMsg = `Error!  ${error.error.message}`;
            }else{
              if(error.status===0){
                errorMsg = `Error! Cannot Connect To Server`;
              }else{
                errorMsg = `Error!  ${error.message}`;
              }
             
            }
              
          }
          this._snackBar.open(errorMsg,'OK', {
            duration: 5 * 1000,
            panelClass:['main-snackbar']
          });
          return throwError(errorMsg);
        
      })
  )
  }
}
