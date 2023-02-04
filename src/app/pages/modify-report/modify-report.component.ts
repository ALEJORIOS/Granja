import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { AlertComponent } from 'src/app/cmps/alert/alert.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-report',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './modify-report.component.html',
  styleUrls: ['./modify-report.component.scss']
})

export default class ModifyReportComponent {
  reportID: string = "";
  report: any;
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

  constructor(private appService: AppService, private aRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(params => {
      if(Object.keys(params).length !== 0) {
        this.reportID = params['id'];
      }else{
        this.router.navigate(['/reports']);
      }
    })
    this.getAchievements();
    this.getStudents();
    this.getAllTeachers();
    this.appService.getOneReport(this.reportID).subscribe({
      next: (res) => {
        this.report = res;
        this.formGroup.controls.date.setValue(this.report.date);
        this.formGroup.controls.service.setValue(this.report.service);
        this.setAchievements();
      }
    })
    this.appService.token.subscribe({
      next: (res) => {
        if(res) this.formGroup.controls.teacher.setValue(JSON.parse(window.atob(res.split('.')[1])).id);
      }
    })
  }

  getAllTeachers() {
    this.appService.getAllTeachers().subscribe({
      next: (res) => {
        this.allTeachers = res;
      },
      error: (err) => console.error(err)
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

  setAchievements() {
    this.allStudents.map((student: any) => {
      this.report.achievements.forEach((ach: any) => {
        ach.students.forEach((std: any) => {
          if(std._id === student._id) {
            student.achievements.push(ach.name);
          }
        })
      })
    })
  }

  selectAchievement(achieve: string) {
    this.currentAchievement = achieve;
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
    if(error) {
      this.enableSave = true;
    }else{
      this.info.msg = "Guardando reporte...";
      this.info.show = true;
      this.enableSave = false;
      this.uploadReport();
    }
  }

  uploadReport() {
      this.achievements.map((ach: any) => {
        ach.students = this.allStudents.filter((std: any) => std.achievements.includes(ach.name));
      });
      const requestBody: any = {
        date: this.formGroup.controls.date.value,
        service: this.formGroup.controls.service.value,
        teacher: this.report.teacher,
        achievements: this.achievements,
        id: this.report._id
      }

      this.appService.editReport(requestBody).subscribe({
        next: () => {
          this.alert.type = "success";
          this.alert.msg = "Reporte editado correctamente";
          this.alert.show = true;
          this.enableSave = true;
        },
        error: (err) => console.error(err),
        complete: () => {
          this.info.show = false;
        }
      })
  }

  translateTeacher(id: string) {
    if(this.allTeachers.length !== 0) {
      const teacher = this.allTeachers.filter((teacher: any) => teacher._id === id)[0];
      return [teacher?.gender === "Male" ? "Maestro" : "Maestra",`${teacher?.name || ""} ${teacher?.lastName || ""}`]
    }else{
      return ["", ""];
    }
  }

  deleteReport() {
    this.appService.deleteReport(this.reportID).subscribe({
      next: () => {
        this.router.navigate(['/reports']);
      },
      error: (err) => console.error(err)
    })
  }
}
