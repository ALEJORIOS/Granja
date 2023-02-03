import { filter } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rate-students',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './rate-students.component.html',
  styleUrls: ['./rate-students.component.scss']
})
export default class RateStudentsComponent implements OnInit {

  achievements: any[] = [];
  currentAchievement: string = "";
  allStudents: any = [];
  students: any = {};

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getAchievements();
    this.getStudents();
  }

  getAchievements() {
    this.appService.getAchievements().subscribe({
      next: (res) => {
        this.achievements = res;
      }
    })
  }

  selectAchievement(achieve: string) {
    this.currentAchievement = achieve;
  }

  setAchievement(studentId: string) {
    if(this.allStudents.filter((std: any) => std._id === studentId)[0].achievements.includes(this.currentAchievement)) {
      this.allStudents.filter((std: any) => std._id === studentId)[0].achievements = this.allStudents.filter((std: any) => std._id === studentId)[0].achievements.filter((ach: string) => ach !== this.currentAchievement);
    }else{
      this.allStudents.filter((std: any) => std._id === studentId)[0].achievements.push(this.currentAchievement);
    }
  }

  show() {
    console.log(this.students);
  }

  getStudents() {
    this.appService.getAllStudents().subscribe({
      next: (res) => {
        this.allStudents = res;
        this.allStudents.map((std: any) => std.achievements = []);
        this.students.g1 = res.filter((stud: any) => stud.group === "1");
        this.students.g2 = res.filter((stud: any) => stud.group === "2");
        this.students.g3 = res.filter((stud: any) => stud.group === "3");
        this.students.g4 = res.filter((stud: any) => stud.group === "4");

      }
    })
  }

  translate2File(name: string): String {
    return this.achievements.filter(ach => ach.name === name)[0].image;
  }
}