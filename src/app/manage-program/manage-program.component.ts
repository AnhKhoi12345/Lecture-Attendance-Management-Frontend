import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CoursesService } from '../courses.service';
import { CsvService } from '../csv.service';
import { LecturerInterface } from '../interfaces/lecturer';
import { AuthService } from '../auth.service';
import { SemesterCSVInterface } from '../interfaces/semesterCSV';
import { ProgramInterface } from '../interfaces/program';
// import { formatDate } from '@angular/common';
@Component({
  selector: 'app-manage-program',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,ReactiveFormsModule],
  templateUrl: './manage-program.component.html',
  styleUrl: './manage-program.component.scss'
})
export class ManageProgramComponent {
  @ViewChild('fileUploadProgram') inputProgram!:ElementRef<HTMLInputElement>;
  programListEmpty: boolean = true;
  authService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  coursesService: CoursesService = inject(CoursesService);
  program:ProgramInterface[] = [];
   public importedProgram: Array<ProgramInterface> = [];
  csvService = inject(CsvService)
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    year: ['',Validators.required],
    // month: [0,Validators.required],
    // date: [0,Validators.required],
  })
  constructor() {}
//   public saveDataInCSV(name: string, data: Array<any>): void {
//     let csvContent = this._csvService.saveDataInCSV(data);
    
//     var hiddenElement = document.createElement('a');
//     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
//     hiddenElement.target = '_blank';
//     hiddenElement.download = name + '.csv';
//     hiddenElement.click();
// }
public async importProgramFromCSV(event: any) {
  let fileContent = await this.getTextFromFile(event);
  this.importedProgram = this.csvService.importDataFromCSV(fileContent);
  console.log(this.importedProgram);
  this.programListEmpty = false
}

private async getTextFromFile(event: any) {
  const file: File = event.target.files[0];
  let fileContent = await file.text();

  return fileContent;
}
createProgramFromCSV():void{
  if( this.importedProgram.length > 0  ) {
  for (let index = 0; index < this.importedProgram.length-1; index++){
    const element = this.importedProgram[index];
      this.coursesService.createProgram( element.program_id, element.name, element.duration).subscribe(()=>{
    })
    
}

 alert("Upload lecturers completed!")
} else alert("Empty CSV file")
}

clearProgramCSV():void{
  this.inputProgram.nativeElement.value = "";
  this.importedProgram = [];
  this.programListEmpty = true;
}
onSubmit(): void {
  const rawForm = this.form.getRawValue();
  console.log(rawForm.year)
  this.coursesService.createIntake(rawForm.year).subscribe({
      })
      
}

}
