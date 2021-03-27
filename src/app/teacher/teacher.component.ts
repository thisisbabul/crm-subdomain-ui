import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Student} from '../model/Student';
import {Teacher} from '../model/Teacher';
import {ConfirmationService, MessageService} from 'primeng-lts/api';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  teacherDialog: boolean;
  teachers: Teacher[];
  teacher: Teacher;
  selectedTeacher: Teacher[];
  submitted: boolean;
  isEditForm: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  openNew(): void {
    this.teacher = new Teacher('', '', '', '', '', '');
    this.submitted = false;
    this.teacherDialog = true;
  }

  editTeacher(teacher: Teacher): void {
    this.teacher = {...teacher};
    this.teacherDialog = true;
    this.isEditForm = true;
  }

  deleteTeacher(teacher: Teacher): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + teacher.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        /*const response = this.userService.deleteStudent(teacher);
        this.teachers = this.teachers.filter(val => val.id !== teacher.id);
        response.subscribe((data) =>
          this.showMessageForDelete(data)
        );*/
      }
    });
  }

  hideDialog(): void {
    this.teacherDialog = false;
    this.submitted = false;
  }

  saveTeacher(): void {
    this.submitted = true;
    const response = this.userService.addTeacher(this.teacher);
    response.subscribe((data) =>
      this.showMessage(data)
    );

    if (!this.isEditForm) {
      this.teachers.push(this.teacher);
      this.teachers = [...this.teachers];
    }
    this.router.navigate(['/teacher']).then();
    this.teacherDialog = false;
  }

  private showMessage(data: any): void {
    if (data === 'success') {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'teacher added successful'});
      setTimeout(() => {
        this.router.navigate(['/teacher']).then();
        this.hideDialog();
      }, 1000 );
    }
    else {
      this.messageService.add({severity: 'error', summary: 'Registration Failed', detail: 'teacher add Failed, try again!'});
    }
  }

  private showMessageForDelete(data: any): void {
    if (data === 'success') {
      setTimeout(() => {
        this.router.navigate(['/teacher']).then();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'teacher Deleted', life: 3000});
      }, 1000 );
    }
    else {
      this.messageService.add({severity: 'error', summary: 'Failed', detail: 'teacher Delete Failed, try again!'});
    }
  }

  clickMyAccount(): any {
    this.router.navigate(['/dashboard']).then();
  }

  clickTeacherInfo(): any {
    this.router.navigate(['/teacher']).then();
  }

  clickStudentInfo(): any {
    this.router.navigate(['/student']).then();
  }

  logout(): any {
    window.location.replace('http://localhost:4200');
  }
}
