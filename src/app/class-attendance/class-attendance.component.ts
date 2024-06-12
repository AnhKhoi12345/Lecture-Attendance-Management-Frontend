import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-attendance',
  standalone: true,
  imports:  [RouterModule, CommonModule],
  templateUrl: './class-attendance.component.html',
  styleUrl: './class-attendance.component.scss'
})
export class ClassAttendanceComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  id!: string;
  constructor() {
    this.id = this.route.snapshot.paramMap.get('classDate')!;
 }
 ngOnInit(): void {
  console.log(this.id)
}
}
