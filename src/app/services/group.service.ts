import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupAges: any = {};
  maxYear: number = 11;
  agesLoad = new BehaviorSubject(false);

  constructor(private appService: AppService) { }

  getAges() {
    this.appService.getGroupAges().subscribe({
      next: (res) => {
        this.groupAges = res[0].value;
        this.agesLoad.next(true);
      },
      error: (err) => {
        console.error(err);
        this.agesLoad.next(false);
      }
    })
  }

  assignGroup(birthday: string): string {
    
    const age = Math.floor(dayjs(dayjs()).diff(birthday, 'year', true));
    if(age >= this.maxYear) {
      return "older";
    }else{
      if(this.groupAges.g1.includes(age)){
        return "1";
      }
      else if(this.groupAges.g2.includes(age)){
        return "2";
      }
      else if(this.groupAges.g3.includes(age)){
        return "3";
      }
      else {
        return "4";
      }
    }
  }
}