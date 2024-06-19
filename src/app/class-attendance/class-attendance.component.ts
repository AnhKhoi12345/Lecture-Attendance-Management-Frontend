import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AttendanceList } from '../interfaces/attendanceList';
import { CoursesService } from '../courses.service';
import { AuthService } from '../auth.service';

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
  constructor() {
    this.classDate = this.route.snapshot.paramMap.get('classDate')!;
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
 }
 ngOnInit(): void {
  this.coursesService.getAttendanceListForStudent(this.courseId, this.classDate).subscribe(attendance => this.attendanceList = attendance);
}
 requestChecking(): void {
  console.log("Request Cheking!");
 }
}
