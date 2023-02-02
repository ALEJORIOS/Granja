import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule, NgbActiveModal, NgbModal, NgbModalModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from 'src/app/modals/add-student/add-student.component';
import { TrueFalsePipe } from 'src/app/pipes/true-false.pipe';
import { DeleteConfirmationComponent } from 'src/app/modals/delete-confirmation/delete-confirmation.component';
import { SummaryComponent } from 'src/app/modals/summary/summary.component';

@Component({
  standalone: true,
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  imports: [NgbAccordionModule, CommonModule, NgbModalModule, TrueFalsePipe]
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
    addModal.result.then((result) => {},
    (reason) => {
      if(reason === "refresh") this.getData();
    });
  }

  editModal(student: any) {
    const addModal: NgbModalRef = this.modalService.open(AddStudentComponent, { size: 'xl' });
    addModal.componentInstance.edit = true;
    addModal.componentInstance.data = student;
    addModal.result.then((result) => {},
    (reason) => {
      if(reason === "refresh") this.getData();
    });
  }

  openDelete(record: any) {
    const confirmation = this.modalService.open(DeleteConfirmationComponent, { size: 'sm' });
    confirmation.componentInstance.data = record;
    confirmation.componentInstance.member = "student";
    confirmation.result.then((result) => {},
    (reason) => {
      if(reason === "refresh") this.getData();
    });
  }

  openSummary() {
    const summary = this.modalService.open(SummaryComponent);
  }
}