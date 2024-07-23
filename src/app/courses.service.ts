import { Injectable, inject } from '@angular/core';
// import { fakeCourses } from './fake-data';
import { CoursesList } from './interfaces/coursesList';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Classes } from './interfaces/classesList';
import { AuthService } from './auth.service';
import { AttendanceList } from './interfaces/attendanceList';
import { UserAccountInterface } from './interfaces/userAccount';
import { NotificationsInterface } from './interfaces/notificationList';
import { UserInterface } from './interfaces/user';
import { UserFirebaseInterface } from './interfaces/userFirebaseAccount';
import { ModuleInterface } from './interfaces/module';
import { LecturerInterface } from './interfaces/lecturer';
import { SemesterInterface } from './interfaces/semester';
import { ProgramModuleInterface } from './interfaces/programModule';
import { ModuleWithIdInterface } from './interfaces/moduleWithId';
import { SemesterCSVInterface } from './interfaces/semesterCSV';
import { ProgramInterface } from './interfaces/program';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authtoken': token,
   })
});
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  authService = inject(AuthService);
  constructor(
    private http: HttpClient,
  ) { }

  getCourses(): Observable<CoursesList[]> {
    return this.http.get<CoursesList[]>('/api/modules')
  }
  getClasses(id:string): Observable<Classes[]> {
    return this.http.get<Classes[]>(`/api/modules/${id}`)
  }
  getAttendanceListForStudent(courseId:string, classDate:string, classStart:string): Observable<AttendanceList[]> {
    return new Observable<AttendanceList[]>(observer => {
      this.authService.user$.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token){
             this.http.get<AttendanceList[]>(`/api/modules/${courseId}/${classDate}/${classStart}/student/${user.uid}`, httpOptionsWithAuthToken(token))
             .subscribe(attendance => {
              observer.next(attendance);
             });

          }else{
            observer.next([]);
          }
        })
      })
    })
  }
  getAttendanceList(courseId:string, classDate:string, classStart:string): Observable<AttendanceList[]> {
    return new Observable<AttendanceList[]>(observer => {
      this.authService.user$.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token){
             this.http.get<AttendanceList[]>(`/api/modules/${courseId}/${classDate}/${classStart}/lecturer/${user.uid}`, httpOptionsWithAuthToken(token))
             .subscribe(attendance => {
              observer.next(attendance);
             });

          }else{
            observer.next([]);
          }
        })
      })
    })
  }
  createAccount(acc_id:string, school_id: string, username:string, email:string, password:string, role: string ): Observable<UserAccountInterface> {
    return this.http.post<UserAccountInterface>(
      `/api/accounts`,
      {acc_id, school_id, username, email, password, role},
      httpOptions,
    );
  }
  createFirebaseAccount(uuid:string, username:string, email:string, password:string ): Observable<UserFirebaseInterface> {
    return this.http.post<UserFirebaseInterface>(
      `/api/firebase/account`,
      {uuid, username, email, password},
      httpOptions,
    );
  }
  createModule( name: string, capacity:string, etcs:string, lecturer_id:string): Observable<ModuleInterface> {
    return this.http.post<ModuleInterface>(
      `/api/module`,
      { name, capacity, etcs, lecturer_id},
      httpOptions,
    );
  }
  createProgramModule( program_id: string, module_id:string, sem_id:string, intake:Date): Observable<ProgramModuleInterface> {
    return this.http.post<ProgramModuleInterface>(
      `/api/program-module`,
      { program_id, module_id, sem_id, intake},
      httpOptions,
    );
  }
  createLecturer( staff_id: string, name:string, program_id:string): Observable<LecturerInterface> {
    return this.http.post<LecturerInterface>(
      `/api/lecturer`,
      { staff_id, name, program_id},
      httpOptions,
    );
  }
  createSemester( sem_type: string, start_date:Date, end_date:Date): Observable<SemesterCSVInterface> {
    return this.http.post<SemesterCSVInterface>(
      `/api/semester`,
      { sem_type, start_date, end_date},
      httpOptions,
    );
  }
  createProgram( program_id: string, name:string, duration:string): Observable<ProgramInterface> {
    return this.http.post<ProgramInterface>(
      `/api/program`,
      { program_id, name, duration},
      httpOptions,
    );
  }
  getAccount(): Observable<UserAccountInterface[]> {
    return new Observable<UserAccountInterface[]>(observer => {
      this.authService.user$.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token){
           this.http.get<UserAccountInterface[]>(`/api/account/${user.uid}`, httpOptionsWithAuthToken(token))
             .subscribe(account => {
              observer.next(account);
          });
            }else{
              observer.next([]);
            }
        })
      })
    })
  }
  getStudentModule(): Observable<CoursesList[]> {
    return new Observable<CoursesList[]>(observer => {
      this.authService.user$.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token){
           this.http.get<CoursesList[]>(`/api/modules/student/${user.uid}`, httpOptionsWithAuthToken(token))
             .subscribe(module => {
              observer.next(module);
          });
            }else{
              observer.next([]);
            }
        })
      })
    })
  }
  getLecturerModule(): Observable<CoursesList[]> {
    return new Observable<CoursesList[]>(observer => {
      this.authService.user$.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token){
           this.http.get<CoursesList[]>(`/api/modules/lecturer/${user.uid}`, httpOptionsWithAuthToken(token))
             .subscribe(module => {
              observer.next(module);
          });
            }else{
              observer.next([]);
            }
        })
      })
    })
  }
  getAllNotifications(): Observable<NotificationsInterface[]> {
    return new Observable<NotificationsInterface[]>(observer => {
      this.authService.user$.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token){
             this.http.get<NotificationsInterface[]>(`/api/modules/notifications/${user.uid}`, httpOptionsWithAuthToken(token))
             .subscribe(noti => {
              observer.next(noti);
             });

          }else{
            observer.next([]);
          }
        })
      })
    })
  }
  sendNotification(sender_id:string, receiver_id:string, noti_text:string): Observable<NotificationsInterface> {
    return this.http.post<NotificationsInterface>(
      `/api/notification`,
      {sender_id, receiver_id, noti_text},
      httpOptions,
    );
  }
  getLecturerByName(lecturer_name:string): Observable<LecturerInterface[]> {
  //   return new Observable<LecturerInterface[]>(observer => {
  //     this.authService.user$.subscribe(user => {
  //       user && user.getIdToken().then(token => {
  //         if (user && token){
  //            this.http.get<AttendanceList[]>(`/api/modules/${courseId}/${classDate}/${classStart}/student/${user.uid}`, httpOptionsWithAuthToken(token))
  //            .subscribe(attendance => {
  //             observer.next(attendance);
  //            });

  //         }else{
  //           observer.next([]);
  //         }
  //       })
  //     })
  //   })
  // }
  return this.http.get<LecturerInterface[]>(`/api/lecturer/${lecturer_name}`)
  }
  getModuleByName(module_name:string): Observable<ModuleWithIdInterface[]> {
    //   return new Observable<LecturerInterface[]>(observer => {
    //     this.authService.user$.subscribe(user => {
    //       user && user.getIdToken().then(token => {
    //         if (user && token){
    //            this.http.get<AttendanceList[]>(`/api/modules/${courseId}/${classDate}/${classStart}/student/${user.uid}`, httpOptionsWithAuthToken(token))
    //            .subscribe(attendance => {
    //             observer.next(attendance);
    //            });
  
    //         }else{
    //           observer.next([]);
    //         }
    //       })
    //     })
    //   })
    // }
    return this.http.get<ModuleWithIdInterface[]>(`/api/module/${module_name}`)
    }
    getSemesterId(sem_type:string, sem_start:Date, sem_end:Date): Observable<SemesterInterface[]> {
      //   return new Observable<LecturerInterface[]>(observer => {
      //     this.authService.user$.subscribe(user => {
      //       user && user.getIdToken().then(token => {
      //         if (user && token){
      //            this.http.get<AttendanceList[]>(`/api/modules/${courseId}/${classDate}/${classStart}/student/${user.uid}`, httpOptionsWithAuthToken(token))
      //            .subscribe(attendance => {
      //             observer.next(attendance);
      //            });
    
      //         }else{
      //           observer.next([]);
      //         }
      //       })
      //     })
      //   })
      // }
      return this.http.get<SemesterInterface[]>(`/api/semester/${sem_type}/${sem_start}/${sem_end}`)
      }
}
