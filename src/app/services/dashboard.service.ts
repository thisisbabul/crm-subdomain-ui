import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../model/User';
import {AppConstants} from '../util/AppConstants';
import {Auth} from '../model/Auth';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private appConstants: AppConstants,
    private cookieService: CookieService,
    private http: HttpClient
  ) { }

  registration(user: User): any {
    return this.http.post(this.appConstants.SAVE_USER_URL, user, {responseType: 'text' as 'json'});
  }

  changePasswd(auth: Auth): any {
    return this.http.post(this.appConstants.CHANGE_PASSWD_URL, auth, {responseType: 'text' as 'json'});
  }
}
