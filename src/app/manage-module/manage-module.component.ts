import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CsvService } from '../csv.service';
import { CoursesList } from '../interfaces/coursesList';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ModuleInterface } from '../interfaces/module';
import { CoursesService } from '../courses.service';
import { LecturerInterface } from '../interfaces/lecturer';
import { ModuleLecturerNameInterface } from '../interfaces/moduleLecturerName';
import { ProgramModuleInterface } from '../interfaces/programModule';
import { SemesterInterface } from '../interfaces/semester';
import { ProgramModuleCSVInterface } from '../interfaces/programModuleCSV';
import { ModuleWithIdInterface } from '../interfaces/moduleWithId';
@Component({
  selector: 'app-manage-module',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-module.component.html',
  styleUrl: './manage-module.component.scss'
})
export class ManageModuleComponent {
  @ViewChild('fileUploadModule') inputModule!:ElementRef<HTMLInputElement>;
  @ViewChild('fileUploadProgramModule') inputProgramModule!:ElementRef<HTMLInputElement>;
  moduleListEmpty: boolean = true;
  programModuleListEmpty: boolean = true;
  authService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  coursesService: CoursesService = inject(CoursesService);
  lecturer:LecturerInterface[] = [];
  module: ModuleWithIdInterface[] = [];
  semester: SemesterInterface[] = [];
   public importedModule: Array<ModuleLecturerNameInterface> = [];
  public importedModuleProgram: Array<ProgramModuleCSVInterface> = [];
  _csvService = inject(CsvService)
  constructor() {}
//   public saveDataInCSV(name: string, data: Array<any>): void {
//     let csvContent = this._csvService.saveDataInCSV(data);
    
//     var hiddenElement = document.createElement('a');
//     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
//     hiddenElement.target = '_blank';
//     hiddenElement.download = name + '.csv';
//     hiddenElement.click();
// }
public async importModuleFromCSV(event: any) {
  let fileContent = await this.getTextFromFile(event);
  this.importedModule = this._csvService.importDataFromCSV(fileContent);
  console.log(this.importedModule);
  this.moduleListEmpty = false
}
public async importProgramModuleFromCSV(event: any) {
  let fileContent = await this.getTextFromFile(event);
  this.importedModuleProgram = this._csvService.importDataFromCSV(fileContent);
  console.log(this.importedModuleProgram);
  this.programModuleListEmpty = false
}
private async getTextFromFile(event: any) {
  const file: File = event.target.files[0];
  let fileContent = await file.text();

  return fileContent;
}
createModuleFromCSV():void{
  if( this.importedModule.length > 0  ) {
  for (let index = 0; index < this.importedModule.length-1; index++){
    const element = this.importedModule[index];
    this.coursesService.getLecturerByName(element.lecturer_name ).subscribe( (lecturer)=>{
      this.lecturer =lecturer
      // console.log(this.lecturer)
      this.coursesService.createModule( element.name, element.capacity, element.etcs, this.lecturer[0].staff_id).subscribe((module)=>{
      console.log(module)
    })
    }
)}

 alert("Upload module completed!")
} else alert("Empty CSV file")
}

createProgramModule():void{
  if( this.importedModuleProgram.length > 0  ) {
  for (let index = 0; index < this.importedModuleProgram.length-1; index++){
    const element = this.importedModuleProgram[index];
    console.log(element.module_name)
    this.coursesService.getModuleByName(element.module_name ).subscribe( (module)=>{
      this.module = module
      console.log("module info: " + this.module[0].module_id)
      this.coursesService.getSemesterId( element.sem_type, element.sem_start, element.sem_end).subscribe((semester)=>{
        this.semester = semester
        console.log("semester info: " +this.semester[0].sem_id)
        this.coursesService.createProgramModule(element.program_id, this.module[0].module_id, this.semester[0].sem_id, element.intake).subscribe(()=>{
        })
      })
    
    }
  )}
    alert("Upload program module completed!")
}else alert("Empty CSV file")
}


clearModuleCSV():void{
  this.inputModule.nativeElement.value = "";
  this.importedModule = [];
  this.moduleListEmpty = true;
}
clearProgramModuleCSV():void{
  this.inputProgramModule.nativeElement.value = "";
  this.importedModuleProgram = [];
  this.programModuleListEmpty = true;
}
todayDate(){
  var q = new Date();
var m = q.getMonth();
var d = q.getDate();
var y = q.getFullYear();

// var date = new Date(y,m,d);
// console.log();
let date1 = new Date("2019-07-05");
let date2 = new Date(y,m,d);
console.log(date1 +" "+ date2);
let Difference_In_Time =
  date2.getTime() - date1.getTime();
let Difference_In_Days =
  Math.round
      (Difference_In_Time / (1000 * 3600 * 24));

console.log
("Total number of days between dates:\n" +
    date1.toDateString() + " and " +
    date2.toDateString() +
    " is: " + Difference_In_Days + " days");
}

}
