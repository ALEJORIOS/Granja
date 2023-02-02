import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {

  @Input('data') data: any;
  @Input('member') member!: string;
  constructor(private modalService: NgbModal, private appService: AppService) {}

  close() {
    this.modalService.dismissAll("close");
  }

  deleteStudent() {
    this.appService.deleteRecord(this.data._id).subscribe({
      next: () => {
        this.modalService.dismissAll("refresh");
      },
      error: (err) => console.error(err)
    })
  }

  deleteTeacher() {
    this.appService.deleteTeacher(this.data._id).subscribe({
      next: () => {
        this.modalService.dismissAll("refresh");
      },
      error: (err) => console.error(err)
    })
  }

}