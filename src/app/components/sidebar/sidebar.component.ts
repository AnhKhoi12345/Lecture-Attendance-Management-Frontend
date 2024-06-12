import { Component, inject } from '@angular/core';
import { signOut } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  authService = inject(AuthService);
logout():void{
  this.authService.logout();
}
}
