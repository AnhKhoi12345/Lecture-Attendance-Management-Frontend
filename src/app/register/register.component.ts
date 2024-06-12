import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router)
  form = this.fb.nonNullable.group({
    username: ['',Validators.required],
   email: ['',Validators.required],
   password:  ['',Validators.required],
  })
  errorMessage: string | null = null;
  onSubmit(): void {
 const rawForm = this.form.getRawValue();
 this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
  next:() => {
  this.router.navigateByUrl('/');
 },

error: (err) =>{
  this.errorMessage = err.code;
},
});
  }
}
