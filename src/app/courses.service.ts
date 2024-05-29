import { Injectable } from '@angular/core';
// import { fakeCourses } from './fake-data';
import { CoursesList } from './interfaces/coursesList';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Classes } from './interfaces/classesList';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient,
  ) { }
  getCourses(): Observable<CoursesList[]> {
    return this.http.get<CoursesList[]>('/api/modules')
  }
  getClasses(id:string): Observable<Classes[]> {
    return this.http.get<Classes[]>(`/api/modules/${id}`)
  }
}
