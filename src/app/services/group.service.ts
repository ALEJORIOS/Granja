import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupAges: any = {};

  constructor(private appService: AppService) { }

  getAges() {
    this.appService.getGroupAges().subscribe({
      next: (res) => {
        this.groupAges = res[0].value;
        console.log('>>>', this.groupAges);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  assignGroup(birthday: string) {
    this.getAges();
    const age = Math.floor(dayjs(dayjs()).diff(birthday, 'year', true));
    
  }
}
