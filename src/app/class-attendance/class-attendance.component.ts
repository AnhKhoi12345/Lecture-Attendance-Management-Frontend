import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AttendanceList } from '../interfaces/attendanceList';
import { CoursesService } from '../courses.service';
import { AuthService } from '../auth.service';
import { UserAccountInterface } from '../interfaces/userAccount';

@Component({
  selector: 'app-class-attendance',
  standalone: true,
  imports:  [RouterModule, CommonModule],
  templateUrl: './class-attendance.component.html',
  styleUrl: './class-attendance.component.scss'
})
export class ClassAttendanceComponent {
  authService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  classDate!: string;
  courseId!: string;
  attendanceList: AttendanceList[] = [];
  coursesService: CoursesService = inject(CoursesService);
  account: UserAccountInterface[] = []
  allAttendanceList: AttendanceList[] = [];
  constructor() {
    this.classDate = this.route.snapshot.paramMap.get('classDate')!;
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
 }
 ngOnInit(): void {
   this.coursesService.getAccount().subscribe(account => this.account = account);
  this.coursesService.getAttendanceListForStudent(this.courseId, this.classDate).subscribe(attendance => this.attendanceList = attendance);
  this.coursesService.getAttendanceList(this.courseId, this.classDate).subscribe(attendance => this.allAttendanceList = attendance);

}

 requestChecking(): void {
  console.log("Request Cheking!");
 }
}
