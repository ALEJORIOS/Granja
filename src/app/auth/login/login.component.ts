import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {

  constructor(private router: Router) {}
  login(event: Event) {
    event.preventDefault();
    console.log('Entra');
    this.router.navigate(['/home']);
  }
}