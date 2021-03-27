import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {AppConstants} from './util/AppConstants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  url: any;
  subdomain: any;
  constructor(
    private cookieService: CookieService,
    private appConstants: AppConstants,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.url = window.location.hostname;
    this.subdomain = this.appConstants.getSubdomain(this.url);
    request = request.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        Authorization: `Bearer ${this.cookieService.get('token')}`,
        tenantId: this.subdomain
      },
    });
    return next.handle(request);
  }
}
