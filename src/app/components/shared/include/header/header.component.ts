import { Component, OnInit } from '@angular/core';
import { ConstantsService } from "../../../../services/constants.service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userProfilePic = this.constantsService.userProfilePic;

  constructor(
    private constantsService: ConstantsService,
    private router: Router,
  ) { }

  ngOnInit() {}

  logout() {
    
    // if( confirm("Are you sure to logout?") ) {

    //   localStorage.removeItem('currentUser');
    //   this.router.navigate(['/login']);
    // }

    Swal.fire(
      'Are you sure you want to logout?',
      '',

      // title: 'Are you sure you want to logout?',
      // type: 'question',
      // showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes!'
    ).then((result) => {
      if (result.value) {
        
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      }
    });
  }
}
