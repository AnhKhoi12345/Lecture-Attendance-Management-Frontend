import { Injectable } from '@angular/core';
// import { fakeCourses } from './fake-data';
import { CoursesList } from './interfaces/coursesList';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Classes } from './interfaces/classesList';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsWithAuthToken = token => ({
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authtoken': token,
   })
})
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
