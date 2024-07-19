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
@Component({
  selector: 'app-manage-module',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-module.component.html',
  styleUrl: './manage-module.component.scss'
})
export class ManageModuleComponent {
  @ViewChild('fileUploadSimple') input!:ElementRef<HTMLInputElement>;
  listEmpty: boolean = true;
  authService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  coursesService: CoursesService = inject(CoursesService);
  lecturer:LecturerInterface[] = [];
  public importedData: Array<ModuleLecturerNameInterface> = [];
  // public arrayWithSimpleData: Array<CoursesList> = [
  //   { module_id: "1",name: 'Math', semester: 'summer', lecturer: 'Bob',start_date: "6/9", end_date: "9/6"},
  //   { module_id: "2",name: 'English', semester: 'summer', lecturer: 'Bob',start_date: "6/9", end_date: "9/6"},
  //   { module_id: "3",name: 'Code', semester: 'summer', lecturer: 'Bob',start_date: "6/9", end_date: "9/6"},
  // ];
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
public async importDataFromCSV(event: any) {
  let fileContent = await this.getTextFromFile(event);
  this.importedData = this._csvService.importDataFromCSV(fileContent);
  console.log(this.importedData);
  this.listEmpty = false
}
private async getTextFromFile(event: any) {
  const file: File = event.target.files[0];
  let fileContent = await file.text();

  return fileContent;
}
//   createModuleFromCSV():void{
//     if( this.importedData.length > 0  ) {
//     for (let index = 0; index < this.importedData.length-1; index++){
//       const element = this.importedData[index];
//       console.log(element);
//       this.coursesService.createModule( element.name, element.capacity, element.etcs, element.lecturer_name).subscribe(()=>{
        
//       })
//   }
//    alert("Upload completed!")
// } else alert("Empty CSV file")
// }
createModuleFromCSV():void{
  if( this.importedData.length > 0  ) {
  for (let index = 0; index < this.importedData.length-1; index++){
    const element = this.importedData[index];
    this.coursesService.getLecturerByName(element.lecturer_name ).subscribe( (lecturer)=>{
      this.lecturer =lecturer
      // console.log(this.lecturer)
      this.coursesService.createModule( element.name, element.capacity, element.etcs, this.lecturer[0].staff_id).subscribe(()=>{
      
    })
    }
)}
 alert("Upload completed!")
} else alert("Empty CSV file")
}
clearCSV():void{
  this.input.nativeElement.value = "";
  this.importedData = [];
  this.listEmpty = true;
}
// ngOnInit(): void {
//   this.coursesService.getLecturerByName("Tran Hong Ngoc").subscribe( lecturer=> this.lecturer =lecturer)

// }
}
