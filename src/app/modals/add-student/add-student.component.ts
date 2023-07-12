import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/services/group.service';
import { AlertComponent } from 'src/app/cmps/alert/alert.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AlertComponent],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  
  @Input('edit') edit: boolean = false;
  @Input('data') data?: any;
  admin: boolean = false;
  teachers: any = [];
  birthday: boolean = true;
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
      parent: new FormControl(''),
      contact: new FormControl(''),
      birthday: new FormControl(''),
      group: new FormControl("1"),
      membership: new FormControl(false),
      gender: new FormControl("Male"),
      points: new FormControl(),
      hedge: new FormControl('')
  })

  constructor(private appService: AppService, private modalService: NgbModal, private groupService: GroupService) {}
  
  ngOnInit(): void {
    this.appService.token.subscribe({
      next: (res) => {
        if(res) {
          this.admin = JSON.parse(window.atob(res.split('.')[1])).role === "Admin" ? true : false;
        }
      }
    })
    this.getTeachers();
    this.groupService.getAges();
    this.groupService.agesLoad.subscribe({
      next: (res) => {
        if(res === false) {
          this.info.msg = "Cargando edades...";
          this.info.show = true;
          this.enableButtons = false;
        }else{
          this.enableButtons = false;
          this.info.show = false;
        }
      }
    })
    if(this.edit) {
      this.formData.controls.name.setValue(this.data.name);
      this.formData.controls.lastName.setValue(this.data.lastName);
      this.formData.controls.parent.setValue(this.data.parent);
      this.formData.controls.contact.setValue(this.data.contact);
      this.formData.controls.birthday.setValue(this.data.birthday);
      this.formData.controls.group.setValue(this.data.group);
      this.formData.controls.membership.setValue(this.data.membership);
      this.formData.controls.gender.setValue(this.data.gender);
      this.formData.controls.points.setValue(this.data.points);
      this.formData.controls.hedge.setValue(this.data.hedge);
      this.birthday = this.data.opt === "birthday" ? true : false;
    }
  }

  close() {
    this.modalService.dismissAll('close');
  }

  getTeachers() {
    this.appService.getAllTeachers().subscribe({
      next: (res) => {
        this.teachers = res;
      },
      error: (err) => console.error(err)
    })
  }

  add() {
    let error: boolean = false;
    if(this.birthday) {
      const result: string = this.groupService.assignGroup(this.formData.controls.birthday.value || "");
      this.formData.controls.group.setValue(result);
      if(result === "older") {
        this.alert.msg = "El estudiante es mayor de la edad permitida en la Granja";
        this.alert.type = "error";
        this.alert.show = true;
        error = true;
      }
    }
    if(!this.formData.controls.name.value) {
      this.alert.msg = "El nombre es obligatorio";
      this.alert.type = "error";
      this.alert.show = true;
      error = true;
    }
    if(this.birthday && !this.formData.controls.birthday.value) {
      this.alert.msg = "Introduzca la fecha de cumpleaños o el grupo infantil";
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
        parent: this.formData.controls.parent.value,
        contact: this.formData.controls.contact.value,
        birthday: this.formData.controls.birthday.value,
        group: this.formData.controls.group.value,
        opt: this.birthday ? "birthday" : "group",
        gender: this.formData.controls.gender.value,
        hedge: this.formData.controls.hedge.value,
        membership: true,
        points: 0
      }
      this.appService.createStudent(requestBody).subscribe({
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

  editStudent() {
    let error: boolean = false;
    if(this.birthday) {
      const result: string = this.groupService.assignGroup(this.formData.controls.birthday.value || "");
      this.formData.controls.group.setValue(result);
      if(result === "older") {
        this.alert.msg = "El estudiante es mayor de la edad permitida en la Granja";
        this.alert.type = "error";
        this.alert.show = true;
        error = true;
      }
    }
    if(!this.formData.controls.name.value) {
      this.alert.msg = "El nombre es obligatorio";
      this.alert.type = "error";
      this.alert.show = true;
      error = true;
    }
    if(this.birthday && !this.formData.controls.birthday.value) {
      this.alert.msg = "Introduzca la fecha de cumpleaños o el grupo infantil";
      this.alert.type = "error";
      this.alert.show = true;
      error = true;
    }
    if(error === false) {
      this.alert.show = false;
      this.info.msg = "Editando Estudiante..."
      this.info.show = true;
      const requestBody: any = {
        id: this.data._id,
        name: this.formData.controls.name.value,
        lastName: this.formData.controls.lastName.value,
        parent: this.formData.controls.parent.value,
        contact: this.formData.controls.contact.value,
        birthday: this.formData.controls.birthday.value,
        group: this.formData.controls.group.value,
        opt: this.birthday ? "birthday" : "group",
        membership: this.formData.controls.membership.value,
        points: this.formData.controls.points.value,
        gender: this.formData.controls.gender.value,
        hedge: this.formData.controls.hedge.value
      }
      this.appService.editStudent(requestBody).subscribe({
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