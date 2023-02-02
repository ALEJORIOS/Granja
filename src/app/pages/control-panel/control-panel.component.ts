import { AfterViewInit, Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminTeachersComponent } from 'src/app/views/admin-teachers/admin-teachers.component';
import { AdminStudentsComponent } from 'src/app/views/admin-students/admin-students.component';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export default class ControlPanelComponent implements OnInit, AfterViewInit {

  @ViewChild('view', { read: ViewContainerRef }) viewRef!: ViewContainerRef;

  currentView: string = "teachers";
  ref!: ComponentRef<any>;

  constructor(private appService: AppService, private modalService: NgbModal) {}

  ngAfterViewInit(): void {
    this.ref = this.viewRef.createComponent(AdminTeachersComponent);
  }
  
  viewTeachers() {
    this.ref.destroy();
    this.ref = this.viewRef.createComponent(AdminTeachersComponent);
  }
  
  viewStudents() {
    this.ref.destroy();
    this.ref = this.viewRef.createComponent(AdminStudentsComponent);
  }

  ngOnInit(): void {
  }
}
