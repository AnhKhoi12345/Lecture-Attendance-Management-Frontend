import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CoursesService } from '../courses.service';
import { CsvService } from '../csv.service';
import { LecturerInterface } from '../interfaces/lecturer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manage-lecturer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-lecturer.component.html',
  styleUrl: './manage-lecturer.component.scss'
})
export class ManageLecturerComponent {
  @ViewChild('fileUploadLecturer') inputLecturer!:ElementRef<HTMLInputElement>;
  lecturerListEmpty: boolean = true;
  authService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  coursesService: CoursesService = inject(CoursesService);
  lecturer:LecturerInterface[] = [];
   public importedLecturer: Array<LecturerInterface> = [];
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
public async importLecturerFromCSV(event: any) {
  let fileContent = await this.getTextFromFile(event);
  this.importedLecturer = this.csvService.importDataFromCSV(fileContent);
  console.log(this.importedLecturer);
  this.lecturerListEmpty = false
}

private async getTextFromFile(event: any) {
  const file: File = event.target.files[0];
  let fileContent = await file.text();

  return fileContent;
}
createLecturerFromCSV():void{
  if( this.importedLecturer.length > 0  ) {
  for (let index = 0; index < this.importedLecturer.length-1; index++){
    const element = this.importedLecturer[index];
      this.coursesService.createLecturer( element.staff_id, element.name, element.program_id).subscribe(()=>{
    })
    
}

 alert("Upload lecturers completed!")
} else alert("Empty CSV file")
}

clearLecturerCSV():void{
  this.inputLecturer.nativeElement.value = "";
  this.importedLecturer = [];
  this.lecturerListEmpty = true;
}
}
