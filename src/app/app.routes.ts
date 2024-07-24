import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { ClassesComponent } from './classes/classes.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ClassAttendanceComponent } from './class-attendance/class-attendance.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageModuleComponent } from './manage-module/manage-module.component';
import { ManageLecturerComponent } from './manage-lecturer/manage-lecturer.component';
import { ManageSemesterComponent } from './manage-semester/manage-semester.component';
import { ManageProgramComponent } from './manage-program/manage-program.component';
import { ManageClassComponent } from './manage-class/manage-class.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';

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
    path: 'manage-module',
    component: ManageModuleComponent,
    title: 'Manage Module',
    pathMatch: 'full',
  },
  {
    path: 'manage-lecturer',
    component: ManageLecturerComponent,
    title: 'Manage Lecturer',
    pathMatch: 'full',
  },
  {
    path: 'manage-semester',
    component: ManageSemesterComponent,
    title: 'Manage Lecturer',
    pathMatch: 'full',
  },
  {
    path: 'manage-program',
    component: ManageProgramComponent,
    title: 'Manage Program',
    pathMatch: 'full',
  },
  {
    path: 'manage-class',
    component: ManageClassComponent,
    title: 'Manage Classes',
    pathMatch: 'full',
  },
  {
    path: 'manage-student',
    component: ManageStudentComponent,
    title: 'Manage Student',
    pathMatch: 'full',
  },
];
