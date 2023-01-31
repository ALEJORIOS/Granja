import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  
  @Input('edit') edit: boolean = false;
  birthday: boolean = true;
  constructor(private modalService: NgbModal, private groupService: GroupService) {}

  formData = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      parent: new FormControl(''),
      contact: new FormControl(''),
      birthday: new FormControl('')
  })


  close() {
    this.modalService.dismissAll();
  }

  add() {
    	this.groupService.assignGroup('1997-01-31');
  }
}