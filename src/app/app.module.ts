import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {DashboardService} from './services/dashboard.service';
import {CookieComponent} from './cookie/cookie.component';
import {AdminComponent} from './admin/admin.component';
import {StudentComponent} from './student/student.component';
import {TeacherComponent} from './teacher/teacher.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppConstants} from './util/AppConstants';
import {LoginService} from './services/login.service';
import {TokenInterceptor} from './token.interceptor';
import {InputTextModule} from 'primeng-lts/inputtext';
import {InputTextareaModule} from 'primeng-lts/inputtextarea';
import {ButtonModule} from 'primeng-lts/button';
import {DynamicDialogModule} from 'primeng-lts/dynamicdialog';
import {DialogModule} from 'primeng-lts/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng-lts/calendar';
import {PasswordModule} from 'primeng-lts/password';
import {ConfirmationService, MessageService} from 'primeng-lts/api';
import {ConfirmDialogModule} from 'primeng-lts/confirmdialog';
import {RippleModule} from 'primeng-lts/ripple';
import {InputNumberModule} from 'primeng-lts/inputnumber';
import {RadioButtonModule} from 'primeng-lts/radiobutton';
import {TableModule} from 'primeng-lts/table';
import {ToastModule} from 'primeng-lts/toast';
import {ToolbarModule} from 'primeng-lts/toolbar';
import {FileUploadModule} from 'primeng-lts/fileupload';
import {RatingModule} from 'primeng-lts/rating';
import {UserService} from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CookieComponent,
    AdminComponent,
    StudentComponent,
    TeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DynamicDialogModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule,
    PasswordModule,
    ConfirmDialogModule,
    RippleModule,
    InputNumberModule,
    RadioButtonModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    RatingModule
  ],
  providers: [
    DashboardService,
    CookieService,
    AppConstants,
    LoginService,
    MessageService,
    ConfirmationService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
