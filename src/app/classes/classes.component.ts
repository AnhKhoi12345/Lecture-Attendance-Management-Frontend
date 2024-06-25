import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Classes } from '../interfaces/classesList';
import { CoursesService } from '../courses.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class ClassesComponent {
  authService = inject(AuthService);
  class: Classes[] = [];
  route: ActivatedRoute = inject(ActivatedRoute);
  coursesService: CoursesService = inject(CoursesService);
  id!: string;
  constructor() {
     this.id = this.route.snapshot.paramMap.get('courseId')!;
  }
  ngOnInit(): void {
    this.coursesService.getClasses(this.id).subscribe(classes => this.class = classes);
    // console.log("this class is: " + this.class);
  }
}
