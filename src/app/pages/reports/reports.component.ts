import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ServiceTranslatePipe } from 'src/app/pipes/service-translate.pipe';
import { Router } from '@angular/router';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, CommonModule, ServiceTranslatePipe],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [{provide: LOCALE_ID, useValue: 'es'}]
})
export default class ReportsComponent implements OnInit {
  
  reports: any = [];
  allTeachers: any = [];

  allDates: number[] = [];

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.getReports();
    this.getAllTeachers();
  }

  getReports() {
    this.appService.getReports().subscribe({
      next: (res) => {
        this.reports = res.reverse();
        this.allDates = this.reports.map((rep: any) => new Date(rep.date).getTime());
        console.log('>> ', this.allDates);
        console.log(new Date(Math.min(...this.allDates)));
        console.log(new Date(Math.max(...this.allDates)));
      }
    })
  }

  getAttendance(report: any): number {
    return report.achievements.filter((ach: any) => ach.name === "Asistencia")[0]?.students?.length;
  }

  getAllTeachers() {
    this.appService.getAllTeachers().subscribe({
      next: (res) => {
        this.allTeachers = res;
      },
      error: (err) => console.error(err)
    })
  }

  translateTeacher(id: string) {
    const teacher = this.allTeachers.filter((teacher: any) => teacher._id === id)[0];
    return [teacher?.gender === "Male" ? "Maestro" : "Maestra",`${teacher?.name || ""} ${teacher?.lastName || ""}`]
  }

  goToReport(id: string) {
    this.router.navigate(['/modify-report'], {queryParams: {id}});
  }
}