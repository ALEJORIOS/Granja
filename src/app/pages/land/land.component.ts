import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  standalone: true,
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.scss'],
  imports: [CommonModule]
})
export default class LandComponent implements OnInit {

  admin: boolean = false;
  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.appService.token.subscribe({
      next: (res: any) => {
        if(res) {
          const data = JSON.parse(window.atob(res.split('.')[1]));
          if(data.role === "Admin") {
            this.admin = true;
          }else{
            this.admin = false;
          }
        }
      }
    })
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}