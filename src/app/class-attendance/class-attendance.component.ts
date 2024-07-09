import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AttendanceList } from '../interfaces/attendanceList';
import { CoursesService } from '../courses.service';
import { AuthService } from '../auth.service';
import { UserAccountInterface } from '../interfaces/userAccount';
import { ModelComponent} from '../components/model/model.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-class-attendance',
  standalone: true,
  imports:  [RouterModule, CommonModule,ModelComponent],
  templateUrl: './class-attendance.component.html',
  styleUrl: './class-attendance.component.scss'
})
export class ClassAttendanceComponent {
  router = inject(Router)
  authService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  classDate!: string;
  courseId!: string;
  classStart!: string;
  attendanceList: AttendanceList[] = [];
  coursesService: CoursesService = inject(CoursesService);
  account: UserAccountInterface[] = []
  allAttendanceList: AttendanceList[] = [];
  noti_text!: string;
  // title = 'modal-app';
  // showModal = false;
  constructor() {
    this.classDate = this.route.snapshot.paramMap.get('classDate')!;
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.classStart = this.route.snapshot.paramMap.get('classStart')!;
 }
 ngOnInit(): void {
   this.coursesService.getAccount().subscribe(account => this.account = account);
  this.coursesService.getAttendanceListForStudent(this.courseId, this.classDate,this.classStart).subscribe(attendance => this.attendanceList = attendance);
  this.coursesService.getAttendanceList(this.courseId, this.classDate,this.classStart).subscribe(attendance => this.allAttendanceList = attendance);

}

 requestChecking(sender:string,sender_id:string,receiver:string,receiver_id:string,module_name:string,semester:string,class_date:Date,start_time:string,end_time:string):void {
    this.noti_text = `Greeting Prof. ${receiver}, student ${sender} (${sender_id}) want to request checking attendance for module ${module_name}, ${semester} semesrter, class on date ${class_date}, time ${start_time} - ${end_time}. Thank you very much`
    this.coursesService.sendNotification(sender_id,receiver_id,this.noti_text || "").subscribe(()=>{
      alert("Your request has been sent! Press OK to return");
      this.router.navigateByUrl(`/courses/${this.courseId}`);
    })
    
  
 }
//  toggleModal = () => {
//   this.showModal = !this.showModal;
// }
}
