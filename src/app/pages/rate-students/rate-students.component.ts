import { AppService } from 'src/app/services/app.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from 'src/app/cmps/alert/alert.component';

@Component({
  selector: 'app-rate-students',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './rate-students.component.html',
  styleUrls: ['./rate-students.component.scss']
})
export default class RateStudentsComponent implements OnInit {

  reports: any = [];
  reportsLoaded: boolean = false;
  achievements: any[] = [];
  currentAchievement: string = "";
  allStudents: any = [];
  allTeachers: any = [];
  students: any = {};
  enableSave: boolean = false;
  alert: any = {
    type: "error",
    show: false,
    msg: ""
  }
  info: any = {
    show: false,
    msg: ""
  }
  selectAllName: any = {
    g1: "Seleccionar Todos",
    g2: "Seleccionar Todos",
    g3: "Seleccionar Todos",
    g4: "Seleccionar Todos"
  }

  formGroup = new FormGroup({
    date: new FormControl(''),
    service: new FormControl('first'),
    teacher: new FormControl('')
  })

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getAchievements();
    this.getStudents();
    this.getReports();
    this.appService.token.subscribe({
      next: (res) => {
        if(res) this.formGroup.controls.teacher.setValue(JSON.parse(window.atob(res.split('.')[1])).id);
      }
    })
  }

  getAchievements() {
    this.appService.getAchievements().subscribe({
      next: (res) => {
        this.achievements = res;
        this.enableSave = true;
      },
    })
  }

  selectAchievement(achieve: string) {
    this.currentAchievement = achieve;
    Object.keys(this.selectAllName).forEach((group: string) => {
      if(this.currentAchievement && this.students[group].every((std: any) => std.achievements.includes(this.currentAchievement))) {
        this.selectAllName[group] = "Deseleccionar Todos";
      }else{
        this.selectAllName[group] = "Seleccionar Todos";
      }
    })
  }

  selectAll(group: string) {
    if(this.students[group].every((std: any) => std.achievements.includes(this.currentAchievement))) {
      this.students[group].map((std: any) => {
        std.achievements = std.achievements.filter((ach: string) => ach !== this.currentAchievement);
      })
    }else{
      this.students[group].filter((std: any) => !std.achievements.includes(this.currentAchievement)).map((std: any) => std.achievements.push(this.currentAchievement));
    }
    if(this.currentAchievement && this.students[group].every((std: any) => std.achievements.includes(this.currentAchievement))) {
      this.selectAllName[group] = "Deseleccionar Todos";
    }else{
      this.selectAllName[group] = "Seleccionar Todos";
    }
  }

  setAchievement(studentId: string) {
    let group = "g"+this.allStudents.filter((std: any) => std._id === studentId)[0].group;
    if(this.allStudents.filter((std: any) => std._id === studentId)[0].achievements.includes(this.currentAchievement)) {
      this.allStudents.filter((std: any) => std._id === studentId)[0].achievements = this.allStudents.filter((std: any) => std._id === studentId)[0].achievements.filter((ach: string) => ach !== this.currentAchievement);
    }else{
      this.allStudents.filter((std: any) => std._id === studentId)[0].achievements.push(this.currentAchievement);
    }
    if(this.currentAchievement && this.students[group].every((std: any) => std.achievements.includes(this.currentAchievement))) {
      this.selectAllName[group] = "Deseleccionar Todos";
    }else{
      this.selectAllName[group] = "Seleccionar Todos";
    }
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

  getReports() {
    this.appService.getReports().subscribe({
      next: (res) => {
        this.reports = res;
        this.reportsLoaded = true;
      }
    })
  }

  show() {
    this.allStudents.forEach((std: any) => {
      console.log('Resultado: ', this.checkStudentReport(std._id));
    })
  }

  checkStudentReport(id: string) {
    if(this.reportsLoaded) {
      return false;
    }else{
      return true;
    }
  }

  translate2File(name: string): String {
    if(name) {
      return this.achievements.filter(ach => ach.name === name)[0].image;
    }else{
      return "";
    }
  }

  save() {
    let error: boolean = false;
    if(!this.formGroup.controls.date.value) {
      this.alert.type = "error";
      this.alert.msg = "La Fecha es obligatoria";
      this.alert.show = true;
      error = true;
    }
    if(!this.formGroup.controls.teacher.value) {
      this.alert.type = "error";
      this.alert.msg = "Elige el Maestro";
      this.alert.show = true;
      error = true;
    }
    if(error) {
      this.enableSave = true;
    }else{
      this.info.msg = "Guardando reporte...";
      this.info.show = true;
      this.enableSave = false;
      this.appService.getVerificationReportExistence({
        date: this.formGroup.controls.date.value, 
        service: this.formGroup.controls.service.value,
        teacher: this.formGroup.controls.teacher.value
      }).subscribe({
        next: (res) => {
          if(res.length === 0) {
            this.uploadReport();
          }else{
            this.alert.type = "error";
            this.alert.msg = "Ya subiste este reporte";
            this.alert.show = true;
            this.enableSave = true;
            this.info.show = false;
          }
        },
        error: (err) => console.error(err)
      })
    }
  }

  uploadReport() {
      this.achievements.map((ach: any) => {
        ach.students = this.allStudents.filter((std: any) => std.achievements.includes(ach.name));
      });
      const requestBody: any = {
        date: this.formGroup.controls.date.value,
        service: this.formGroup.controls.service.value,
        teacher: this.formGroup.controls.teacher.value,
        achievements: this.achievements
      }
  
      this.appService.createReport(requestBody).subscribe({
        next: () => {
          this.alert.type = "success";
          this.alert.msg = "Reporte enviado correctamente";
          this.alert.show = true;
        },
        error: (err) => console.error(err),
        complete: () => {
          this.info.show = false;
        }
      })
  }
}