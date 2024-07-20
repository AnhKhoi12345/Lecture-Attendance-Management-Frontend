import { Component,inject } from '@angular/core';
import { CoursesList } from '../interfaces/coursesList';
// import { fakeCourses } from '../fake-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { AuthService } from '../auth.service';
import { UserAccountInterface } from '../interfaces/userAccount';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  finished: boolean = true;
  ongoing: boolean = true;
  coursesList: CoursesList[] = [];
  filteredCourses: CoursesList[] = [];
  // emptyList: CoursesList[] = [];
  coursesService: CoursesService = inject(CoursesService);
  authService = inject(AuthService);
  account: UserAccountInterface[] = []
  lecturerModuleList: CoursesList[] = [];
  filteredLecturerModules: CoursesList[] = [];
  allModuleList: CoursesList[] = [];
  filteredAllModules: CoursesList[] = [];

  listEmpty:boolean = false;

  filterModuleName:string ="";
  filterLecturerName: string ="";
  filterProgramId: string ="";
  filterIntake: string ="";
  filterSemester: string ="";
  public module = {} as any;
  program:string = '';
  intake :string = '';
  semester :string = '';
  constructor() {
  }
  ngOnInit(): void {
    this.coursesService.getAccount().subscribe(account => this.account = account);
    this.coursesService.getStudentModule().subscribe(courses => this.coursesList = courses);
    this.coursesService.getStudentModule().subscribe(courses => this.filteredCourses = courses);
    this.coursesService.getLecturerModule().subscribe(courses => this.lecturerModuleList = courses);
    this.coursesService.getLecturerModule().subscribe(courses => this.filteredLecturerModules = courses);
    this.coursesService.getCourses().subscribe(courses => this.allModuleList = courses);
    this.coursesService.getCourses().subscribe(courses => this.filteredAllModules = courses);

    this.module.program = 'all';
    this.module.intake = 'all';
    this.module.semester = 'both';
    // this.module.intake = new Date().getFullYear().toString();
  }

  filterByModule(text: string) {
    this.filterModuleName = text.toLowerCase();
    this.filterModule(text)
  }
  filterByLecturer(text: string) {
    this.filterLecturerName = text.toLowerCase();
    this.filterModule(text)
  }
  filterByProgram(text: string) {
    if(text === "all"){
      this.filterProgramId= ""
    }else this.filterProgramId= text
    
    this.filterModule(text)
  }
  filterByIntake(text: string) {
    if(text === "all"){ 
      this.filterIntake= ""
    }else this.filterIntake= text
    this.filterModule(text)
  }
  filterBySemester(text: string) {
    if(text === "both"){ 
      this.filterSemester= ""
    }else this.filterSemester= text
    this.filterModule(text)
  }
  filterModule(text: string){
    if (!text) {
      this.listEmpty = false;
    }
      this.filteredAllModules = this.allModuleList.filter(
        (list) =>
          list?.name.toLowerCase().includes(this.filterModuleName) 
      )
      .filter((list) => list?.lecturer.toLowerCase().includes(this.filterLecturerName))
      .filter((list) => list?.program_id.toLowerCase().includes(this.filterProgramId))
      .filter((list) => list?.intake.toString().toLowerCase().includes(this.filterIntake))
      .filter((list) => list?.semester.toLowerCase().includes(this.filterSemester))
      
      this.filteredLecturerModules = this.lecturerModuleList.filter(
        (list) =>
          list?.name.toLowerCase().includes(this.filterModuleName) 
      )
      .filter((list) => list?.lecturer.toLowerCase().includes(this.filterLecturerName))
      .filter((list) => list?.program_id.toLowerCase().includes(this.filterProgramId))
      .filter((list) => list?.intake.toString().toLowerCase().includes(this.filterIntake))
      .filter((list) => list?.semester.toLowerCase().includes(this.filterSemester))

      this.filteredCourses = this.coursesList.filter(
        (list) =>
          list?.name.toLowerCase().includes(this.filterModuleName) 
      )
      .filter((list) => list?.lecturer.toLowerCase().includes(this.filterLecturerName))
      .filter((list) => list?.program_id.toLowerCase().includes(this.filterProgramId))
      .filter((list) => list?.intake.toString().toLowerCase().includes(this.filterIntake))
      .filter((list) => list?.semester.toLowerCase().includes(this.filterSemester))
      
      if(this.filteredAllModules.length === 0){
        this.listEmpty = true;
      }else this.listEmpty = false;
  }
}
