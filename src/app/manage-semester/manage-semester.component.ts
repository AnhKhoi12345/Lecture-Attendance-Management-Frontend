import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CoursesService } from '../courses.service';
import { CsvService } from '../csv.service';
import { LecturerInterface } from '../interfaces/lecturer';
import { AuthService } from '../auth.service';
import { SemesterCSVInterface } from '../interfaces/semesterCSV';
@Component({
  selector: 'app-manage-semester',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-semester.component.html',
  styleUrl: './manage-semester.component.scss'
})
export class ManageSemesterComponent {
  @ViewChild('fileUploadSemester') inputSemester!:ElementRef<HTMLInputElement>;
  semesterListEmpty: boolean = true;
  authService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  coursesService: CoursesService = inject(CoursesService);
  semester:SemesterCSVInterface[] = [];
   public importedSemester: Array<SemesterCSVInterface> = [];
  csvService = inject(CsvService)
  constructor() {}
//   public saveDataInCSV(name: string, data: Array<any>): void {
//     let csvContent = this._csvService.saveDataInCSV(data);
    
//     var hiddenElement = document.createElement('a');
//     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
//     hiddenElement.target = '_blank';
//     hiddenElement.download = name + '.csv';
//     hiddenElement.click();
// }
public async importSemesterFromCSV(event: any) {
  let fileContent = await this.getTextFromFile(event);
  this.importedSemester = this.csvService.importDataFromCSV(fileContent);
  console.log(this.importedSemester);
  this.semesterListEmpty = false
}

private async getTextFromFile(event: any) {
  const file: File = event.target.files[0];
  let fileContent = await file.text();

  return fileContent;
}
createSemesterFromCSV():void{
  if( this.importedSemester.length > 0  ) {
  for (let index = 0; index < this.importedSemester.length-1; index++){
    const element = this.importedSemester[index];
      this.coursesService.createSemester( element.sem_type, element.start_date, element.end_date).subscribe(()=>{
    })
    
}

 alert("Upload lecturers completed!")
} else alert("Empty CSV file")
}

clearSemesterCSV():void{
  this.inputSemester.nativeElement.value = "";
  this.importedSemester = [];
  this.semesterListEmpty = true;
}
}
