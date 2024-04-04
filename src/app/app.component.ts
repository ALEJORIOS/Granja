import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentRoute!: string;
  barsExceptions: Array<String> = ['/auth/login'];
  showBars: boolean = false;
  constructor(router: Router, appService: AppService) {
    router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
      this.showBars = !this.barsExceptions.includes(this.currentRoute);
      if(localStorage.getItem('user') === null) {
        router.navigate(['auth/login']);
      }
      if(this.currentRoute === '/auth/login') {
        localStorage.removeItem('user');
        localStorage.removeItem('hiddenDates');
      }
      appService.token.subscribe({
        next: (res) => {
          if(!res) {
            if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || "").token) {
              appService.verifyToken({jwt: JSON.parse(localStorage.getItem('user') || "").token}).subscribe({
                next: () => {
                  appService.token.next(JSON.parse(localStorage.getItem('user') || "").token);
                },
                error: () => {
                  router.navigate(['/auth/login']);
                }
              })
            }else{
              router.navigate(['/auth/login']);
            }
          }
        }
      })
    })
  }
}