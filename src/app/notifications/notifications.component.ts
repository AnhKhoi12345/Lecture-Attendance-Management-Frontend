import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationsInterface } from '../interfaces/notificationList';
import { CoursesService } from '../courses.service';
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  authService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  coursesService: CoursesService = inject(CoursesService);
  notiList: NotificationsInterface[] = []
  ngOnInit(): void {
   this.coursesService.getAllNotifications().subscribe(attendance => this.notiList = attendance);
 }
}
