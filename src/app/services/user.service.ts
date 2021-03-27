import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../model/Auth';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {AppConstants} from '../util/AppConstants';
import {Student} from '../model/Student';
import {Teacher} from '../model/Teacher';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private appConstants: AppConstants
  ) { }

  addStudent(student: Student): any {
    return this.http.post(this.appConstants.ADD_STUDENT_URL, student, {responseType: 'text' as 'json'});
  }

  getStudents(): any {
    return this.http.get(this.appConstants.ALL_STUDENT_URL);
  }

  deleteStudent(student: Student): any {
    return this.http.post(this.appConstants.DELETE_STUDENT_URL, student, {responseType: 'text' as 'json'});
  }

  addTeacher(teacher: Teacher): any {
    return this.http.post(this.appConstants.ADD_TEACHER_URL, teacher, {responseType: 'text' as 'json'});
  }
}
