import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from 'src/app/modals/add-student/add-student.component';

@Component({
  standalone: true,
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  imports: [NgbAccordionModule, CommonModule, NgbModalModule]
})
export default class StudentsComponent implements OnInit {

  groupOne: any[] = [];
  groupTwo: any[] = [];
  groupThree: any[] = [];
  groupFour: any[] = [];
  constructor(private appService: AppService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void{
    this.appService.getAllStudents().subscribe({
      next: (res) => {
        this.groupOne = res.filter((stud: any) => stud.group === "1")
        this.groupTwo = res.filter((stud: any) => stud.group === "2")
        this.groupThree = res.filter((stud: any) => stud.group === "3")
        this.groupFour = res.filter((stud: any) => stud.group === "4")
      }
    })
  }

  addModal() {
    const addModal: NgbModalRef = this.modalService.open(AddStudentComponent, { size: 'xl' });
    addModal.componentInstance.edit = false;
  }

  editModal() {
    const addModal: NgbModalRef = this.modalService.open(AddStudentComponent, { size: 'xl' });
    addModal.componentInstance.edit = true;
    
  }
}
