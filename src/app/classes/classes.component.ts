import { Component, OnInit, inject } from '@angular/core';
import { CoursesList } from '../interfaces/coursesList';
// import { fakeCourses } from '../fake-data';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Classes } from '../interfaces/classesList';
import { fakeClass } from '../fake-data';
@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class ClassesComponent {
  // class: Classes[] = [];
  // courses: CoursesList | undefined;
  // route: ActivatedRoute = inject(ActivatedRoute);
  // courseID!: number;
  // fullClass: Classes[] = [];
  constructor() {
  //   this.fullClass = fakeClass;
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.courseID = +id; // Convert to number
  //   }
  //   this.courses = fakeCourses.find((courses) => courses.id === this.courseID);
  // } // private route: ActivatedRoute
  // ngOnInit(): void {
  //   this.class = this.fullClass.filter(
  //     (fullClass) => fullClass?.module_id === this.courseID
  //   );
  }
}
