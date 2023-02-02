import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule]
})
export default class LoginComponen {

  username = new FormControl('');
  password = new FormControl('');
  constructor(private router: Router, private appService: AppService) {}
  onSubmit() {
    this.appService.login({username: this.username.value, password: this.password.value}).subscribe({
      next: (res) => {
        this.router.navigate(['/home']);
        localStorage.setItem("user", JSON.stringify(res));
      }
    })
  }
}