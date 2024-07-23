import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserAccountInterface } from '../interfaces/userAccount';
import { CoursesService } from '../courses.service';
import { getAuth } from '@angular/fire/auth';
import { randomUUID } from 'crypto';
import { CsvService } from '../csv.service';
import { UserAccountCSVInterface } from '../interfaces/userAccountCSV';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('fileUploadAccounts') inputAccounts!:ElementRef<HTMLInputElement>;
  auth = getAuth();
  courseService = inject(CoursesService)
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router)
  form = this.fb.nonNullable.group({
    schoolId: ['',Validators.required],
    username: ['',Validators.required],
   email: ['',Validators.required],
   password:  ['',Validators.required],
   role: ['',Validators.required],
  })
  errorMessage: string | null = null;
  public importedAccount: Array<UserAccountCSVInterface> = [];
  csvService = inject(CsvService)
  accountListEmpty:boolean = true;
  public async importAccountsfromCSV(event: any) {
    let fileContent = await this.getTextFromFile(event);
    this.importedAccount = this.csvService.importDataFromCSV(fileContent);
    console.log(this.importedAccount);
    this.accountListEmpty = false
  }
  private async getTextFromFile(event: any) {
    const file: File = event.target.files[0];
    let fileContent = await file.text();
    return fileContent;
  }

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    const username = rawForm.username;
    let uuid = self.crypto.randomUUID();
  
    // this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
    // next:() => {
    //   this.authService.user$.subscribe(user => {
    //   this.courseService.createAccount(user?.uid || "",rawForm.schoolId, rawForm.username, rawForm.email, rawForm.password,rawForm.role).subscribe(()=>{

    //     this.router.navigateByUrl('/').then(() => {window.location.reload();});
    //   })
    //   // return this.http.post<UserAccountInterface>(
    //   //   'api/accounts',
    //   //   {username, rawForm.username},
    
    //   // )
    //   })
    this.courseService.createFirebaseAccount(uuid,rawForm.username,rawForm.email,  rawForm.password).subscribe({
      next:() => {
        this.courseService.createAccount(uuid,rawForm.schoolId, rawForm.username, rawForm.email, rawForm.password,rawForm.role).subscribe(()=>{
          alert("Account created successfully")
        })
        
  },
error: (err) =>{
  this.errorMessage = err.code;
},
});
}
createModuleFromCSV():void{
  if( this.importedAccount.length > 0  ) {
    for (let index = 0; index < this.importedAccount.length-1; index++){
      const element = this.importedAccount[index];
      if(element.password.length < 6){
        alert("Password should be at least 6 characters long")
        return
      }
    }
  for (let index = 0; index < this.importedAccount.length-1; index++){
    const element = this.importedAccount[index];
    let uuid = self.crypto.randomUUID();
    this.courseService.createFirebaseAccount(uuid,element.username,element.email,  element.password).subscribe({
      next:() => {
        this.courseService.createAccount(uuid,element.school_id,element.username, element.email, element.password,element.role).subscribe(()=>{
          
        })
        
  },
  error: (err) =>{
    this.errorMessage = err.code;
  },
  });
}

 alert("Sign and upload accounts completed!")
} else alert("Empty CSV file")
}
clearAccountsCSV():void{
  this.inputAccounts.nativeElement.value = "";
  this.importedAccount = [];
  this.accountListEmpty = true;
}
}
