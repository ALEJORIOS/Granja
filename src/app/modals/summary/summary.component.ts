import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  summary: any = {
    pequenoRedil: 0,
    simientoPreciosa: 0,
    sembradores: 0,
    cosechadores: 0,
    women: 0,
    men: 0,
    total: 0
  }
    
  constructor(private appService: AppService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.appService.getAllStudents().subscribe({
      next: (res) => {
        this.summary.pequenoRedil = res.filter((stud: any) => stud.group === "1").length;
        this.summary.simientoPreciosa = res.filter((stud: any) => stud.group === "2").length;
        this.summary.sembradores = res.filter((stud: any) => stud.group === "3").length;
        this.summary.cosechadores = res.filter((stud: any) => stud.group === "4").length;
        this.summary.women = res.filter((stud: any) => stud.gender === "Female").length;
        this.summary.men = res.filter((stud: any) => stud.gender === "Male").length;
        this.summary.total = res.length;
      }
    })
  }

  close() {
    this.modalService.dismissAll("close");
  }



}
