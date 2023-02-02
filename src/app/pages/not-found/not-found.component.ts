import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  standalone: true,
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export default class NotFoundComponent {

  constructor(private appService: AppService) {}

}
