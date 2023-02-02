import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  standalone: true,
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  name: string = "";
  constructor(private router: Router, appService: AppService) {
    appService.token.subscribe({
      next: (res) => {
        if(res) {
          this.name = JSON.parse(window.atob(res.split('.')[1])).name;
        }
      }
    })
  }

  toHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.router.navigate(['/auth/login']);
  }
}