import { Component } from '@angular/core';
import { ConstantsService } from "./services/constants.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hotelAppView';

  constructor(
    private constantsService: ConstantsService
  ) {
    this.constantsService.setLocalStorage();
  }
}
