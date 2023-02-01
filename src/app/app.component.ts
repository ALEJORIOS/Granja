import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentRoute!: string;
  barsExceptions: Array<String> = ['/auth/register', '/auth/recover', '/auth/login'];
  showBars: boolean = false;
  constructor(private router: Router) {
    router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
      this.showBars = !this.barsExceptions.includes(this.currentRoute)
    })
  }
}