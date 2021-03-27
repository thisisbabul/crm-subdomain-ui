import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Student} from '../model/Student';
import {ConfirmationService, MessageService} from 'primeng-lts/api';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  studentDialog: boolean;
  students: Student[];
  student: Student;
  selectedStudents: Student[];
  submitted: boolean;
  isEditForm: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isEditForm = false;
    const response = this.userService.getStudents();
    response.subscribe((data) =>
      this.students = data
    );
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

  openNew(): void {
    this.student = new Student('', '', '', '', '');
    this.submitted = false;
    this.studentDialog = true;
  }

  editStudent(student: Student): void {
    this.student = {...student};
    this.studentDialog = true;
    this.isEditForm = true;
  }

  deleteStudent(student: Student): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + student.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const response = this.userService.deleteStudent(student);
        this.students = this.students.filter(val => val.id !== student.id);
        response.subscribe((data) =>
          this.showMessageForDelete(data)
        );
      }
    });
  }

  hideDialog(): void {
    this.studentDialog = false;
    this.submitted = false;
  }

  saveStudent(): void {
    this.submitted = true;
    const response = this.userService.addStudent(this.student);
    response.subscribe((data) =>
      this.showMessage(data)
    );

    if (!this.isEditForm) {
      this.students.push(this.student);
      this.students = [...this.students];
    }
    this.router.navigate(['/student']).then();
    this.studentDialog = false;
  }

  private showMessage(data: any): void {
    if (data === 'success') {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Student added successful'});
      setTimeout(() => {
        this.router.navigate(['/student']).then();
        this.hideDialog();
      }, 1000 );
    }
    else {
      this.messageService.add({severity: 'error', summary: 'Registration Failed', detail: 'Student add Failed, try again!'});
    }
  }

  private showMessageForDelete(data: any): void {
    if (data === 'success') {
      setTimeout(() => {
        this.router.navigate(['/student']).then();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Student Deleted', life: 3000});
      }, 1000 );
    }
    else {
      this.messageService.add({severity: 'error', summary: 'Failed', detail: 'Student Delete Failed, try again!'});
    }
  }
}
