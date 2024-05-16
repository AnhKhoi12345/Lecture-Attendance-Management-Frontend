import { Component, OnInit } from '@angular/core';
import { CoursesList } from '../interfaces/coursesList';
import { fakeCourses } from '../fake-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  coursesList: CoursesList[] = [];
  filteredCourses: CoursesList[] = [];
  constructor() {}
  ngOnInit(): void {
    this.coursesList = fakeCourses;
    this.filteredCourses = fakeCourses;
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredCourses = this.coursesList;
      return;
    }
    this.filteredCourses = this.coursesList.filter((coursesList) =>
      coursesList?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
