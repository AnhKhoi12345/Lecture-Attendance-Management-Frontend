import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserAccountInterface } from '../interfaces/userAccount';
import { CoursesService } from '../courses.service';
import { getAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
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
  onSubmit(): void {
    
  const rawForm = this.form.getRawValue();
  const username = rawForm.username;
  this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
  next:() => {
    this.authService.user$.subscribe(user => {
    this.courseService.createAccount(user?.uid || "",rawForm.schoolId, rawForm.username, rawForm.email, rawForm.password,rawForm.role).subscribe(()=>{

      this.router.navigateByUrl('/').then(() => {window.location.reload();});
    })
    // return this.http.post<UserAccountInterface>(
    //   'api/accounts',
    //   {username, rawForm.username},
  
    // )
    })
  },
  
error: (err) =>{
  this.errorMessage = err.code;
},
});


  }
}
