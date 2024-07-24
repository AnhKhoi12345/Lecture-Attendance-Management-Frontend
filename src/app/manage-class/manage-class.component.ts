import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CsvService } from '../csv.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { CoursesService } from '../courses.service';
import { LecturerInterface } from '../interfaces/lecturer';
import { ModuleLecturerNameInterface } from '../interfaces/moduleLecturerName';
import { SemesterInterface } from '../interfaces/semester';
import { ProgramModuleCSVInterface } from '../interfaces/programModuleCSV';
import { ModuleWithIdInterface } from '../interfaces/moduleWithId';
import { ClassCSVInterface } from '../interfaces/classCSV';
@Component({
  selector: 'app-manage-class',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-class.component.html',
  styleUrl: './manage-class.component.scss'
})
export class ManageClassComponent {
  @ViewChild('fileUploadClass') inputClass!:ElementRef<HTMLInputElement>;
  classListEmpty: boolean = true;
  authService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  coursesService: CoursesService = inject(CoursesService);
  module: ModuleWithIdInterface[] = [];
   public importedClass: Array<ClassCSVInterface> = [];
  csvService = inject(CsvService)

constructor() {}

public async importClassFromCSV(event: any) {
  let fileContent = await this.getTextFromFile(event);
  this.importedClass = this.csvService.importDataFromCSV(fileContent);
  console.log(this.importedClass);
  this.classListEmpty = false
}
private async getTextFromFile(event: any) {
  const file: File = event.target.files[0];
  let fileContent = await file.text();

  return fileContent;
}

createClass():void{
  if( this.importedClass.length > 0  ) {
  for (let index = 0; index < this.importedClass.length-1; index++){
    const element = this.importedClass[index];
    console.log(element)
    this.coursesService.getModuleByName(element.module_name ).subscribe( (module)=>{
      this.module = module
        this.coursesService.createClass(this.module[0].module_id,element.class_date, element.start_time,element.end_time).subscribe(()=>{
        })
    }
  )}
    alert("Upload classes completed!")
}else alert("Empty CSV file")
}


clearClassCSV():void{
  this.inputClass.nativeElement.value = "";
  this.importedClass = [];
  this.classListEmpty = true;
}
}
