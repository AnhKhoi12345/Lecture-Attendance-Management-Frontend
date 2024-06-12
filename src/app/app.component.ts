import { Component,inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
// import { Firestore, collectionData, collection } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, CoursesComponent, HeaderComponent, SidebarComponent,HttpClientModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Lecture-Attendance-Management-Frontend';
  authService = inject(AuthService);
  // firestore: Firestore = inject(Firestore);
  constructor() {
    // const itemCollection = collection(this.firestore, 'guests');
    // this.item$ = collectionData(itemCollection);
  }
  ngOnInit(): void{
    this.authService.user$.subscribe(user=>{
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }
  logout():void{
    console.log('logout');
  }
}
