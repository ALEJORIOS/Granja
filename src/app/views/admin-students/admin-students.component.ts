import { AddAchievementComponent } from './../../modals/add-achievement/add-achievement.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.scss']
})
export class AdminStudentsComponent implements OnInit {
  
  achievements: any = [];
  constructor(private appService: AppService, private modalService: NgbModal) {}
  
  ngOnInit(): void {
    this.getAhievements();
  }

  getAhievements() {
    this.appService.getAchievements().subscribe({
      next: (res) => {
        this.achievements = res;
      }
    })
  }

  openAdd() {
    const addModal: NgbModalRef = this.modalService.open(AddAchievementComponent);
    addModal.result.then((result) => {},
    (reason) => {
      if(reason === "refresh") this.getAhievements();
    });
  }

  openEdit(data: any) {
    const editModal: NgbModalRef = this.modalService.open(AddAchievementComponent);
    editModal.componentInstance.edit = true;
    editModal.componentInstance.data = data;
    editModal.result.then((result) => {},
    (reason) => {
      if(reason === "refresh") this.getAhievements();
    });
  }

  deleteAchievement(achievement: any) {
    const achievements = this.achievements.filter((ach: any) => ach.name !== achievement.name);
    this.appService.createAchievement({value: achievements}).subscribe({
      next: () => {
        this.getAhievements();
      },
      error: (err) => console.error(err)
    })
  }

}
