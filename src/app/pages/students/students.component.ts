import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  imports: [NgbAccordionModule, CommonModule]
})
export default class StudentsComponent implements OnInit {

  groupOne: any[] = [];
  groupTwo: any[] = [];
  groupThree: any[] = [];
  groupFour: any[] = [];
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void{
    this.appService.getAllStudents().subscribe({
      next: (res) => {
        this.groupOne = res.filter((stud: any) => stud.group === "1")
        this.groupTwo = res.filter((stud: any) => stud.group === "2")
        this.groupThree = res.filter((stud: any) => stud.group === "3")
        this.groupFour = res.filter((stud: any) => stud.group === "4")
      }
    })
  }
}
