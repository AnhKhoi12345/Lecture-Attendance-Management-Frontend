import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { ClassesComponent } from './classes/classes.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ClassAttendanceComponent } from './class-attendance/class-attendance.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageModuleComponent } from './manage-module/manage-module.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   title: 'Login',
  //   pathMatch: 'full',
  // },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: CoursesComponent,
    title: 'Courses',
    pathMatch: 'full',
  },
  {
    path: 'courses/:courseId',
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
    path: 'courses/:courseId/:classDate/:classStart',
    component: ClassAttendanceComponent,
    title: 'Class Attendance',
    pathMatch: 'full',
  },
  {
    path: 'managemodule',
    component: ManageModuleComponent,
    title: 'Manage Module',
    pathMatch: 'full',
  },
];
