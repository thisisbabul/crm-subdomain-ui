import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppConstants {
  public BASE_URL = 'http://localhost:8080/';
  public ADMIN_URL = this.BASE_URL + 'admin';
  public TEACHER_URL = this.BASE_URL + 'teacher';
  public STUDENT_URL = this.BASE_URL + 'student';
  public CHECK_SUBDOMAIN_URL = this.BASE_URL + 'checkSubdomain/';
  public USER_URL = this.BASE_URL + 'user/';
  public SAVE_USER_URL = this.BASE_URL + 'saveUser';
  public CHANGE_PASSWD_URL = this.BASE_URL + 'changePassword';
  public ADD_STUDENT_URL = this.BASE_URL + 'addStudent';
  public ALL_STUDENT_URL = this.BASE_URL + 'getStudents';
  public DELETE_STUDENT_URL = this.BASE_URL + 'deleteStudent';
  public ADD_TEACHER_URL = this.BASE_URL + 'addTeacher';

  constructor(
    private cookieService: CookieService
  ) { }

  public getSubdomain(hostName: string): string {
    if (hostName.length) {
      const lastIndexOfSubdomain = hostName.indexOf('.');
      const subdomain = hostName.substring(0, lastIndexOfSubdomain);
      return subdomain;
    }
    return '';
  }

  public resetCookie(): void {
    const token = this.cookieService.get('token');
    if (token.length) {
      this.cookieService.set('token', token);
    }
  }
}
