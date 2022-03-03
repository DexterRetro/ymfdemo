import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersServiceService } from '../services/users-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private user:UsersServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokken = this.user.getToken();
    if(tokken){
      this.user.isAuthenticated;
    }
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${tokken}` }
  });
    return next.handle(request);
  }
}
