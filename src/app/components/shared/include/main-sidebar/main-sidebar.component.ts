import { Component, OnInit } from '@angular/core';
import { ConstantsService } from "../../../../services/constants.service";

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  public userProfilePic = this.constantsService.userProfilePic;

  constructor(
    private constantsService: ConstantsService
  ) { }

  ngOnInit() {
  }
}
