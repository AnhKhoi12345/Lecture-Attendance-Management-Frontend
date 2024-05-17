import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { ClassesComponent } from './classes/classes.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ClassAttendanceComponent } from './class-attendance/class-attendance.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: CoursesComponent,
    title: 'Courses',
    pathMatch: 'full',
  },
  {
    path: 'courses/:id',
    component: ClassesComponent,
    title: 'Classes',
    pathMatch: 'full',
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    title: 'Notificaitons',
    pathMatch: 'full',
  },
  {
    path: 'courses/:id/:id',
    component: ClassAttendanceComponent,
    title: 'Class Attendance',
    pathMatch: 'full',
  },
];
