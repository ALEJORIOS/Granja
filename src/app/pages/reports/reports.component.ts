import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ServiceTranslatePipe } from 'src/app/pipes/service-translate.pipe';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import * as minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax)

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, CommonModule, ServiceTranslatePipe],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export default class ReportsComponent implements OnInit {

  reports: any = [];
  allTeachers: any = [];

  allDates: dayjs.Dayjs[] = [];
  missingDates: dayjs.Dayjs[] = [];

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.getReports();
    this.getAllTeachers();
  }

  getReports() {
    this.appService.getReports().subscribe({
      next: (res) => {
        this.reports = res.reverse();
        this.allDates = this.reports.map((rep: any) => dayjs(rep.date));
        this.getMissingReports();
      }
    })
  }

  getMissingReports() {
    const minDate = dayjs.min(this.allDates);
    const maxDate = dayjs.max(this.allDates);
    let iterDate = minDate.clone();
    const churchDates = [];
    while(!maxDate.isSame(iterDate)) {
      if(iterDate.day() === 5 || iterDate.day() === 0) {
        churchDates.push(iterDate.clone())
      }
      iterDate = iterDate.date(iterDate.date() + 1);
    }
    const numericDate: number[] = this.allDates.map((date: dayjs.Dayjs) => date.valueOf());
    const notIntercept: dayjs.Dayjs[] = churchDates.filter((date: dayjs.Dayjs) => {
      return !numericDate.includes(date.valueOf());
    })
    const alreadyHidden: string[] = JSON.parse(localStorage.getItem("hiddenDates") || "[]");
    const formattedHidden = alreadyHidden.map((date: string) => dayjs(date)).map((date: dayjs.Dayjs) => date.valueOf());

    this.missingDates = notIntercept.filter((date: dayjs.Dayjs) => !formattedHidden.includes(date.valueOf()));
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
    return [teacher?.gender === "Male" ? "Maestro" : "Maestra", `${teacher?.name || ""} ${teacher?.lastName || ""}`]
  }

  goToReport(id: string) {
    this.router.navigate(['/modify-report'], { queryParams: { id } });
  }

  hideDate(dateToHide: dayjs.Dayjs) {
    this.missingDates = this.missingDates.filter((date: dayjs.Dayjs) => !date.isSame(dateToHide));
    const hiddenDates = JSON.parse(localStorage.getItem("hiddenDates") || "[]");
    hiddenDates.push(dateToHide);    
    localStorage.setItem("hiddenDates", JSON.stringify(hiddenDates));
  }
}