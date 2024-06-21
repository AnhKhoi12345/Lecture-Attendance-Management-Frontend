import { Injectable, inject } from '@angular/core';
// import { fakeCourses } from './fake-data';
import { CoursesList } from './interfaces/coursesList';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Classes } from './interfaces/classesList';
import { AuthService } from './auth.service';
import { AttendanceList } from './interfaces/attendanceList';
import { UserAccountInterface } from './interfaces/userAccount';
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
  getAttendanceListForStudent(courseId:string, classDate:string): Observable<AttendanceList[]> {
    return new Observable<AttendanceList[]>(observer => {
      this.authService.user$.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token){
             this.http.get<AttendanceList[]>(`/api/modules/${courseId}/${classDate}/user/${user.uid}`, httpOptionsWithAuthToken(token))
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
}
