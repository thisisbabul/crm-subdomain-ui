import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardService} from '../services/dashboard.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AppConstants} from '../util/AppConstants';
import {User} from '../model/User';
import {DynamicDialogRef} from 'primeng-lts/dynamicdialog';
import {MessageService} from 'primeng-lts/api';
import {Auth} from '../model/Auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  url = '';
  token = '';
  subdomain = '';
  user: any;
  display = false;
  changePassword = false;
  auth: Auth = new Auth('', '');
  dateOfBirth: Date = new Date('2021-01-22');
  existUser: User = new User('', '', '', '', '');
  constructor(
    private constants: AppConstants,
    private dashboardService: DashboardService,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.url = window.location.hostname;
    this.subdomain = this.constants.getSubdomain(this.url);
    this.http.get(this.constants.USER_URL + this.subdomain).subscribe(
      data => {
        this.user = data;
      });
  }

  public showDialog(): void {
    this.existUser = this.user;
    this.display = true;
  }

  public openChangePasswordPopup(): void {
    this.changePassword = true;
  }

  editUser(): void {
    const response = this.dashboardService.registration(this.user);
    response.subscribe(
      data => {
        this.showMessage(data);
      });
  }

  private showMessage(data: any): void {
    if (data === 'success') {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'User Edited Successful'});
      setTimeout(() => {
        // this.router.navigate(['/dashboard']).then();
        this.display = false;
        this.changePassword = false;
      }, 1000 );
    }
    else {
      this.messageService.add({severity: 'error', summary: 'Edit Failed', detail: 'User Edit Failed, try again!'});
    }
  }

  changePasswordSubmit(): void {
    this.auth.subdomain = this.subdomain;
    const response = this.dashboardService.changePasswd(this.auth);
    response.subscribe(
      data => {
        this.showMessage(data);
      });
  }

  getStudentInfo(): void {
    this.router.navigate(['/student']).then();
  }

  logout(): void {
    window.location.replace('http://localhost:4200');
  }
}
