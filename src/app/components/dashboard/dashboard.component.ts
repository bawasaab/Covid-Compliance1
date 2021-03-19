import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DashboardService } from "../../services/dashboard.service";
import { LoginService } from "../../services/login.service";

import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalUsers = 0;
  totalPolls = 0;
  totalLivePolls = 0;
  totalVotedPolls = 0;

  constructor(
    private dashboardService: DashboardService,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {

    // this.getTotalUsers();
    // this.getTotalPolls();
    // this.getTotalLivePolls();
    // this.getTotalVotedPolls();
  }

  getTotalUsers() {

    this.dashboardService.getTotalUsers().subscribe(
      result => {

        if( result.errorArr.length > 0) {

          if( result.error.tokenError ) {
            this.router.navigate(['/login']);
            // Swal.fire({
            //   type: 'error',
            //   title: result.error.tokenError.toString(),
            //   text: result.error.tokenError.toString()
            // });
          } else {
            // Swal.fire({
            //   type: 'error',
            //   title: result.errorArr.toString(),
            //   text: result.errorArr.toString()
            // });
          }
        } else {

          this.totalUsers = result.cnt;
        }
      }
    );
  }
  
  getTotalPolls() {

    this.dashboardService.getTotalPolls().subscribe(
      result => {

        if( result.errorArr.length > 0) {

          if( result.error.tokenError ) {
            this.router.navigate(['/login']);
            // Swal.fire({
            //   type: 'error',
            //   title: result.error.tokenError.toString(),
            //   text: result.error.tokenError.toString()
            // });
          } else {
            // Swal.fire({
            //   type: 'error',
            //   title: result.errorArr.toString(),
            //   text: result.errorArr.toString()
            // });
          }
        } else {

          this.totalPolls = result.cnt;
        }
      }
    );
  }

  getTotalLivePolls() {
    
    this.dashboardService.getTotalLivePolls().subscribe(
      result => {

        if( result.errorArr.length > 0) {

          if( result.error.tokenError ) {
            this.router.navigate(['/login']);
            // Swal.fire({
            //   type: 'error',
            //   title: result.error.tokenError.toString(),
            //   text: result.error.tokenError.toString()
            // });
          } else {
            // Swal.fire({
            //   type: 'error',
            //   title: result.errorArr.toString(),
            //   text: result.errorArr.toString()
            // });
          }
        } else {
          this.totalLivePolls = result.cnt;
        }
      }
    );
  }

  getTotalVotedPolls() {
    
    this.dashboardService.getTotalVotedPolls().subscribe(
      result => {

        if( result.errorArr.length > 0) {

          if( result.error.tokenError ) {
            this.router.navigate(['/login']);
          //   Swal.fire({
          //     type: 'error',
          //     title: result.error.tokenError.toString(),
          //     text: result.error.tokenError.toString()
          //   });
          // } else {
          //   Swal.fire({
          //     type: 'error',
          //     title: result.errorArr.toString(),
          //     text: result.errorArr.toString()
          //   });
          }
        } else {

          this.totalVotedPolls = result.cnt;
        }
      }
    );
  } 
}
