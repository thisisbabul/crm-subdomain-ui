import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CookieComponent} from './cookie/cookie.component';
import {AdminComponent} from './admin/admin.component';
import {TeacherComponent} from './teacher/teacher.component';
import {StudentComponent} from './student/student.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'teacher', component: TeacherComponent},
  {path: 'student', component: StudentComponent},
  {path: '', component: DashboardComponent},
  {path: ':token', component: CookieComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
