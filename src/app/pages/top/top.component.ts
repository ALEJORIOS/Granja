import { filter } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export default class TopComponent {

  reports: any;
  students: any;
  rawStudents: any;

  top3Achievements: Top3 = defaultTop3;

  constructor(private baseService: AppService) {
    this.getReports();
  }
  
  getReports() {
    this.baseService.getReports().subscribe({
      next: (res) => {
        this.reports = res;
        this.getStudents();
      }
    })
  }

  getStudents() {
    this.students = [];
    this.baseService.getAllStudents().subscribe({
      next: (res) => {
        this.rawStudents = res;
        res.forEach((std: any) => {
          this.students.push({id: std._id, tabernaculo: 0, vara: 0, monte: 0, mana: 0, tierra: 0, bono: 0, total: 0});
        });
      },
      complete: () => {
        this.processData();
      }
    })
  }

  processData() {
    this.reports.forEach((rpt: any) => {
      rpt.achievements.forEach((ach: any) => {
        const achID: number = ach.order;
        ach.students.forEach((std: any) => {
          this.assignPoints(std._id, achID);
        });
      });
    });
    setTimeout(() => {
      // Set top 3
      this.students.sort((a: any, b: any) => b.total - a.total);
      const top: string[] = [this.students[0].id, this.students[1].id, this.students[2].id];
      this.setTop3(0, top);
      // Set tabernacle
      this.students.sort((a: any, b: any) => b.tabernaculo - a.tabernaculo);
      const topTab: string[] = [this.students[0].id, this.students[1].id, this.students[2].id];
      this.setTop3(1, topTab);
      // Set stick
      this.students.sort((a: any, b: any) => b.vara - a.vara);
      const topStick: string[] = [this.students[0].id, this.students[1].id, this.students[2].id];
      this.setTop3(2, topStick);
      // Set mountain
      this.students.sort((a: any, b: any) => b.monte - a.monte);
      const topMountain: string[] = [this.students[0].id, this.students[1].id, this.students[2].id];
      this.setTop3(3, topMountain);
      // Set mana
      this.students.sort((a: any, b: any) => b.mana - a.mana);
      const topMana: string[] = [this.students[0].id, this.students[1].id, this.students[2].id];
      this.setTop3(4, topMana);
      // Set land
      this.students.sort((a: any, b: any) => b.tierra - a.tierra);
      const topLand: string[] = [this.students[0].id, this.students[1].id, this.students[2].id];
      this.setTop3(5, topLand);
      // Set bonus
      this.students.sort((a: any, b: any) => b.bono - a.bono);
      const topBonus: string[] = [this.students[0].id, this.students[1].id, this.students[2].id];
      this.setTop3(6, topBonus);

      setTimeout(() => {
        console.log('Resultado ', this.top3Achievements)
      }, 50);
    }, 50);
  }

  setTop3(achieve: number, ids: string[]) {
    const achieves: any = ["", "tabernaculo", "vara", "monte", "mana", "tierra", "bono"];
    if(achieve === 0) {
      console.log('>>> ', ids);
      console.log('>>> ', this.students) 
      this.top3Achievements.top.first.name = this.rawStudents.filter((std: any) => std._id === ids[0])[0].name;
      this.top3Achievements.top.first.lastName = this.rawStudents.filter((std: any) => std._id === ids[0])[0].lastName;
      this.top3Achievements.top.first.points = this.students.filter((std: any) => std.id === ids[0])[0].total;
      
      this.top3Achievements.top.second.name = this.rawStudents.filter((std: any) => std._id === ids[1])[0].name;
      this.top3Achievements.top.second.lastName = this.rawStudents.filter((std: any) => std._id === ids[1])[0].lastName;
      this.top3Achievements.top.second.points = this.students.filter((std: any) => std.id === ids[1])[0].total;
      
      this.top3Achievements.top.third.name = this.rawStudents.filter((std: any) => std._id === ids[2])[0].name;
      this.top3Achievements.top.third.lastName = this.rawStudents.filter((std: any) => std._id === ids[2])[0].lastName;
      this.top3Achievements.top.third.points = this.students.filter((std: any) => std.id === ids[2])[0].total;
    }else{
      this.top3Achievements[achieves[achieve] as keyof Top3].first.name = this.rawStudents.filter((std: any) => std._id === ids[0])[0].name;
      this.top3Achievements[achieves[achieve] as keyof Top3].first.lastName = this.rawStudents.filter((std: any) => std._id === ids[0])[0].lastName;
      this.top3Achievements[achieves[achieve] as keyof Top3].first.points = this.students.filter((std: any) => std.id === ids[0])[0][achieves[achieve]];
  
      this.top3Achievements[achieves[achieve] as keyof Top3].second.name = this.rawStudents.filter((std: any) => std._id === ids[1])[0].name;
      this.top3Achievements[achieves[achieve] as keyof Top3].second.lastName = this.rawStudents.filter((std: any) => std._id === ids[1])[0].lastName; 
      this.top3Achievements[achieves[achieve] as keyof Top3].second.points = this.students.filter((std: any) => std.id === ids[1])[0][achieves[achieve]]; 
  
      this.top3Achievements[achieves[achieve] as keyof Top3].third.name = this.rawStudents.filter((std: any) => std._id === ids[2])[0].name;
      this.top3Achievements[achieves[achieve] as keyof Top3].third.lastName = this.rawStudents.filter((std: any) => std._id === ids[2])[0].lastName; 
      this.top3Achievements[achieves[achieve] as keyof Top3].third.points = this.students.filter((std: any) => std.id === ids[2])[0][achieves[achieve]]; 
    }
  }

  assignPoints(id: string, achievement: number) {
    const achieves: any = ["", ["tabernaculo", 1], ["vara", 2], ["monte", 4], ["mana", 3], ["tierra", 5], ["bono", 3]];
    this.students = this.students.map((std: any) => {
      if(std.id === id) {
        return {...std, [achieves[achievement][0]]: std[achieves[achievement][0]] + 1, total: std.total + achieves[achievement][1]}
      }else{
        return std
      }
    })
  }
}

interface Top3 {
  top: Top3Positions;
  tabernaculo: Top3Positions;
  vara: Top3Positions;
  monte: Top3Positions;
  mana: Top3Positions;
  tierra: Top3Positions;
  bono: Top3Positions;
}
interface Top3Positions {
  first: Top3Names;
  second: Top3Names;
  third: Top3Names;
}
interface Top3Names {
  name: string;
  lastName: string;
  points: number;
}

const defaultTop3 = {
  top: {first: {name: "", lastName: "", points: 0}, second: {name: "", lastName: "", points: 0}, third: {name: "", lastName: "", points: 0}},
  tabernaculo: {first: {name: "", lastName: "", points: 0}, second: {name: "", lastName: "", points: 0}, third: {name: "", lastName: "", points: 0}},
  vara: {first: {name: "", lastName: "", points: 0}, second: {name: "", lastName: "", points: 0}, third: {name: "", lastName: "", points: 0}},
  monte: {first: {name: "", lastName: "", points: 0}, second: {name: "", lastName: "", points: 0}, third: {name: "", lastName: "", points: 0}},
  mana: {first: {name: "", lastName: "", points: 0}, second: {name: "", lastName: "", points: 0}, third: {name: "", lastName: "", points: 0}},
  tierra: {first: {name: "", lastName: "", points: 0}, second: {name: "", lastName: "", points: 0}, third: {name: "", lastName: "", points: 0}},
  bono: {first: {name: "", lastName: "", points: 0}, second: {name: "", lastName: "", points: 0}, third: {name: "", lastName: "", points: 0}}
}