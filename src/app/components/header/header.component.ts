import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CoursesService } from '../../courses.service';
import { CommonModule } from '@angular/common';
import { UserAccountInterface } from '../../interfaces/userAccount';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  coursesService: CoursesService = inject(CoursesService);
  account: UserAccountInterface[] = []
  ngOnInit(): void {
    this.coursesService.getAccount().subscribe(account => this.account = account);
    
  }
}
