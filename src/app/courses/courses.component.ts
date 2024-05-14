import { Component, OnInit } from '@angular/core';
import { CoursesList } from '../interfaces/coursesList';
import { fakeCourses } from '../fake-data';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  coursesList: CoursesList[] = [];
  constructor() {
    this.coursesList = fakeCourses;
  }
  // ngOninit(): void {

  // }
}
