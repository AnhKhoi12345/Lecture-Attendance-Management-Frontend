import { Component,inject } from '@angular/core';
import { CoursesList } from '../interfaces/coursesList';
// import { fakeCourses } from '../fake-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../courses.service';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  finished: boolean = true;
  ongoing: boolean = true;
  coursesList: CoursesList[] = [];
  filteredCourses: CoursesList[] = [];
  emptyList: CoursesList[] = [];
  coursesService: CoursesService = inject(CoursesService);
  constructor() {
    // this.emptyList = [
    //   {
    //     id: 0,
    //     name: 'No course found',
    //     semester: '',
    //     lecturer: '',
    //     active: false,
    //   },
    // ];
  }
  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(courses => this.coursesList = courses);
    this.coursesService.getCourses().subscribe(courses => this.filteredCourses = courses);
  }
  filterResults(text?: string) {
    if (!text) {
      this.filteredCourses = this.coursesList;
    } else if (text) {
      this.filteredCourses = this.coursesList.filter(
        (coursesList) =>
          coursesList?.name.toLowerCase().includes(text.toLowerCase()) ||
          coursesList?.lecturer.toLowerCase().includes(text.toLowerCase()) ||
          coursesList?.semester.toLowerCase().includes(text.toLowerCase())
      );
    }
    // if (this.finished && this.ongoing) {
    //   this.filteredCourses = this.filteredCourses.filter(
    //     (coursesList) =>
    //       coursesList?.active === true || coursesList?.active === false
    //   );
    //   return;
    // } else if (this.finished && !this.ongoing) {
    //   this.filteredCourses = this.filteredCourses.filter(
    //     (coursesList) => coursesList?.active === false
    //   );
    //   return;
    // } else if (!this.finished && this.ongoing) {
    //   this.filteredCourses = this.filteredCourses.filter(
    //     (coursesList) => coursesList?.active === true
    //   );
    //   return;
    // } else if (!this.finished && !this.ongoing) {
    //   this.filteredCourses = this.emptyList;
    //   return;
    // } else return;
  }
}
