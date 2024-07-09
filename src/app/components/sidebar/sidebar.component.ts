import { Component, inject } from '@angular/core';
import { signOut } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { UserAccountInterface } from '../../interfaces/userAccount';
import { CoursesService } from '../../courses.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  authService = inject(AuthService);
  account: UserAccountInterface[] = []
  coursesService: CoursesService = inject(CoursesService);
  ngOnInit(): void {
    this.coursesService.getAccount().subscribe(account => this.account = account);
  }
logout():void{
  this.authService.logout();
}
}
