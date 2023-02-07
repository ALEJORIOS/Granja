import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddTeacherComponent } from 'src/app/modals/add-teacher/add-teacher.component';
import { DeleteConfirmationComponent } from 'src/app/modals/delete-confirmation/delete-confirmation.component';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-admin-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.scss'],
  providers: [{provide: LOCALE_ID, useValue: 'es'}]
})
export class AdminTeachersComponent implements OnInit {

  teachers: any;

  constructor(private appService: AppService, private modalService: NgbModal) {}
  
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.appService.getAllTeachers().subscribe({
      next: (res) => {
        this.teachers = res;
      },
      error: (err) => console.error(err)
    })
  }

  openAdd() {
    const addModal: NgbModalRef = this.modalService.open(AddTeacherComponent, { size: 'lg'});
    addModal.result.then((result) => {},
    (reason) => {
      if(reason === "refresh") this.getData();
    });
  }

  openEdit(teacher: any) {
    const editModal: NgbModalRef = this.modalService.open(AddTeacherComponent, { size: 'lg' });
    editModal.componentInstance.edit = true;
    editModal.componentInstance.data = teacher;
    editModal.result.then((result) => {},
    (reason) => {
      if(reason === "refresh") this.getData();
    });
  }

  openDelete(record: any) {
    const confirmation = this.modalService.open(DeleteConfirmationComponent, { size: 'sm' });
    confirmation.componentInstance.data = record;
    confirmation.componentInstance.member = "teacher";
    confirmation.result.then((result) => {},
    (reason) => {
      if(reason === "refresh") this.getData();
    });
  }



}
