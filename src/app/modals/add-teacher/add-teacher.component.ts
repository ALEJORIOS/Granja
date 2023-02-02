import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from 'src/app/cmps/alert/alert.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AlertComponent],
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  
  @Input('edit') edit: boolean = false;
  @Input('data') data?: any;
  passwordVisible: boolean = false;
  alert: any = {
    type: "error",
    msg: "",
    show: false
  }
  info: any = {
    msg: "",
    show: false
  }
  enableButtons: boolean = true;
  formData = new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      birthday: new FormControl(''),
      role: new FormControl('Teacher'),
      email: new FormControl(''),
      gender: new FormControl("Male"),
      contact: new FormControl('')
  })

  constructor(private appService: AppService, private modalService: NgbModal, private groupService: GroupService) {}

  ngOnInit(): void {
    if(this.edit) {
      this.formData.controls.name.setValue(this.data.name);
      this.formData.controls.lastName.setValue(this.data.lastName);
      this.formData.controls.username.setValue(this.data.username);
      this.formData.controls.password.setValue(this.data.password);
      this.formData.controls.birthday.setValue(this.data.birthday);
      this.formData.controls.role.setValue(this.data.role);
      this.formData.controls.email.setValue(this.data.email);
      this.formData.controls.gender.setValue(this.data.gender);
      this.formData.controls.contact.setValue(this.data.contact);
    }
  }

  
  close() {
    this.modalService.dismissAll('close');
  }

  showPassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  add() {
    let error: boolean = false;
    if(!this.formData.controls.name.value) {
      this.alert.msg = "El nombre es obligatorio";
      this.alert.type = "error";
      this.alert.show = true;
      error = true;
    }
    if(error === false) {
      this.alert.show = false;
      this.info.msg = "Creando Estudiante..."
      this.info.show = true;
      const requestBody: any = {
        name: this.formData.controls.name.value,
        lastName: this.formData.controls.lastName.value,
        username: this.formData.controls.username.value,
        password: this.formData.controls.password.value,
        birthday: this.formData.controls.birthday.value,
        role: this.formData.controls.role.value,
        email: this.formData.controls.email.value,
        gender: this.formData.controls.gender.value,
        contact: this.formData.controls.contact.value,
      }
      this.appService.createTeacher(requestBody).subscribe({
        next: () => {
          this.modalService.dismissAll('refresh');
        },
        error: (err) => {
          console.error(err)
        },
        complete: () => {
          this.info.show = false;
        }
      })
    }
  }

  editTeacher() {
    let error: boolean = false;
    if(!this.formData.controls.name.value) {
      this.alert.msg = "El nombre es obligatorio";
      this.alert.type = "error";
      this.alert.show = true;
      error = true;
    }
    if(error === false) {
      this.alert.show = false;
      this.info.msg = "Editando Maestro..."
      this.info.show = true;
      const requestBody: any = {
        name: this.formData.controls.name.value,
        lastName: this.formData.controls.lastName.value,
        username: this.formData.controls.username.value,
        password: this.formData.controls.password.value,
        birthday: this.formData.controls.birthday.value,
        role: this.formData.controls.role.value,
        email: this.formData.controls.email.value,
        gender: this.formData.controls.gender.value,
        contact: this.formData.controls.contact.value,
        id: this.data._id
      }

      this.appService.editTeacher(requestBody).subscribe({
        next: () => {
          this.modalService.dismissAll('refresh');
        },
        error: (err) => {
          console.error(err)
        },
        complete: () => {
          this.info.show = false;
        }
      })

    }
  }
}
