import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AlertComponent } from 'src/app/cmps/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, AlertComponent, CommonModule]
})
export default class LoginComponen {

  username = new FormControl('');
  password = new FormControl('');
  disableSubmit: boolean = false;
  alert: any = {
    type: "error",
    msg: "",
    show: false
  }
  info: any = {
    show: false,
    msg: ""
  }

  constructor(private router: Router, private appService: AppService) {}
  onSubmit() {
    this.disableSubmit = true;
    this.info.msg = "Cargando...";
    this.info.show = true;
    if(!this.username.value || !this.password.value) {
      this.alert.type = "error";
      this.alert.msg = "Usuario y Contraseña requeridos";
      this.alert.show = true;
      this.info.show = false;
      this.disableSubmit = false;
    }else{
      this.appService.login({username: this.username.value, password: this.password.value}).subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
          localStorage.setItem("user", JSON.stringify(res));
          this.appService.token.next(res.token);
        },
        error: (err) => {
          if(err.status === 401) {
            this.alert.type = "error";
            this.alert.msg = "Usuario y/o Contraseña erróneos";
            this.alert.show = true;
          }else{
            this.alert.type = "error";
            this.alert.msg = "Ocurrió un error, vuelva a intentarlo";
            this.alert.show = true;
          }
        }
      }).add(() => {
        this.info.show = false;
        this.disableSubmit = false;
      })
    }
  }
}