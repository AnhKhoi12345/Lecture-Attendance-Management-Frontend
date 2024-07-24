import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CsvService } from '../csv.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { CoursesService } from '../courses.service';
import { ModuleWithIdInterface } from '../interfaces/moduleWithId';
import { StudentCSVInterface } from '../interfaces/studentCSV';
import { ModuleEnrollCSVInterface } from '../interfaces/moduleEnrollCSV';

@Component({
  selector: 'app-manage-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-student.component.html',
  styleUrl: './manage-student.component.scss'
})
export class ManageStudentComponent {
  @ViewChild('fileUploadStudent') inputStudent!:ElementRef<HTMLInputElement>;
  @ViewChild('fileUploadModuleEnroll') inputModuleEnroll!:ElementRef<HTMLInputElement>;
  studentListEmpty: boolean = true;
  enrollListEmpty: boolean = true;
  authService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  coursesService: CoursesService = inject(CoursesService);
  module: ModuleWithIdInterface[] = [];
   public importedStudent: Array<StudentCSVInterface> = [];
   public importedModuleEnroll: Array<ModuleEnrollCSVInterface> = [];
  csvService = inject(CsvService)
  constructor() {}
public async importStudentFromCSV(event: any) {
  let fileContent = await this.getTextFromFile(event);
  this.importedStudent = this.csvService.importDataFromCSV(fileContent);
  console.log(this.importedStudent);
  this.studentListEmpty = false
}
public async importModuleEnrollFromCSV(event: any) {
  let fileContent = await this.getTextFromFile(event);
  this.importedModuleEnroll = this.csvService.importDataFromCSV(fileContent);
  console.log(this.importedModuleEnroll);
  this.enrollListEmpty = false
}
private async getTextFromFile(event: any) {
  const file: File = event.target.files[0];
  let fileContent = await file.text();

  return fileContent;
}
createStudentFromCSV():void{
  if( this.importedStudent.length > 0  ) {
  for (let index = 0; index < this.importedStudent.length-1; index++){
    const element = this.importedStudent[index];
      this.coursesService.createStudent( element.student_id, element.student_name, element.image_location).subscribe(()=>{
          this.coursesService.createProgramRegistering( element.student_id, element.program_id, element.intake).subscribe(()=>{
          })
    }
)}
alert("Upload module completed!")
  }else alert("Empty CSV file")
}

enrollModule():void{
  if( this.importedModuleEnroll.length > 0  ) {
    for (let index = 0; index < this.importedModuleEnroll.length-1; index++){
      const element = this.importedModuleEnroll[index];
        this.coursesService.getModuleByName( element.module_name).subscribe((module)=>{
        this.module = module
            this.coursesService.createModuleEnroll( element.student_id, module[0].module_id).subscribe(()=>{
            })
      }
  )}
  alert("Upload module completed!")
    }else alert("Empty CSV file")
}


clearStudentCSV():void{
  this.inputStudent.nativeElement.value = "";
  this.importedStudent = [];
  this.studentListEmpty = true;
}
clearModuleEnrollCSV():void{
  this.inputModuleEnroll.nativeElement.value = "";
  this.importedModuleEnroll = [];
  this.enrollListEmpty = true;
}
}
