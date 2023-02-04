import { filter } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-achievement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-achievement.component.html',
  styleUrls: ['./add-achievement.component.scss']
})
export class AddAchievementComponent implements OnInit {
  
  icons: any = [];
  achievements: any = [];
  form = new FormGroup({
    name: new FormControl(''),
    value: new FormControl(),
    icon: new FormControl('')
  })
  @Input('edit') edit: boolean = false;
  @Input('data') data: any;

  constructor(private appService: AppService, private modalService: NgbModal) {}
  
  ngOnInit(): void {
    this.getIcons();
    this.getAchievements();
    console.log('>>>', this.data.image)
    if(this.edit) {
      this.form.controls.name.setValue(this.data.name);
      this.form.controls.value.setValue(this.data.value);
      this.form.controls.icon.setValue(this.data.image);
    }
  }

  getIcons() {
    this.appService.getIcons().subscribe({
      next: (res) => {
        this.icons = res.value;
      },
      error: (err) => console.error(err)
    })
  }

  getAchievements() {
    this.appService.getAchievements().subscribe({
      next: (res) => {
        this.achievements = res;
      },
      error: (err) => console.error(err)
    })
  }

  selectIcon(icon: string) {
    this.form.controls.icon.setValue(icon);
  }

  saveAchievement() {
    this.achievements.push({
      name: this.form.controls.name.value,
      value: this.form.controls.value.value,
      image: this.form.controls.icon.value
    })
    this.appService.createAchievement({value: this.achievements}).subscribe({
      next: () => {
        this.modalService.dismissAll('refresh');
      },
      error: (err) => console.error(err)
    })
  }

  editAchievement() {
    this.achievements.map((ach: any) => {
      if(ach.name === this.data.name) {
        ach.name = this.form.controls.name.value,
        ach.value = this.form.controls.value.value,
        ach.image = this.form.controls.icon.value
      }
    })

    console.log('>>>', this.achievements);
    this.appService.createAchievement({value: this.achievements}).subscribe({
      next: () => {
        this.modalService.dismissAll('refresh');
      },
      error: (err) => console.error(err)
    })
  }
}
