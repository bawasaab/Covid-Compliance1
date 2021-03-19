import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConstantsService } from "../../../services/constants.service";
import { RestaurantService } from "../../../services/restaurant.service";

import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public users;
  public searchTxt = '';

  // pagination
  public offset = 0;
  public limit = 5;
  public totalRecords = 0;
  public totalPages = 0;
  public pageNo = 0;
  public prevPage = 0;
  public nextPage = 0;
  public firstPage = 0;
  public lastPage = 0;
  public activePage = 0;
  public currentPage = 1;
  public maxPage = 0;
  public minPage = 0;
  public showPagination = false;
  public in_data;

  constructor(
    private router: Router,
    private restaurantService: RestaurantService,
    private spinner: NgxSpinnerService,
    private constantsService: ConstantsService
  ) {
    this.limit = this.constantsService.paginationLimit;
    this.totalRecords = 0;

    this.in_data = {
      search: this.searchTxt,
      offset: this.offset,
      limit: this.limit
    };
  }

  ngOnInit(): void {
    this.spinner.show();
    this.restaurtantListing( 0 );
  }

  createRange( number ) {
    var items: number[] = [];
    for( var i = 1; i <= number; i++ ) {
      items.push(i);
    }
    return items;
  }

  generatePagination( in_data ) {

    this.showPagination = true;

    let offset = in_data.offset;
    this.totalPages = Math.ceil(this.totalRecords / this.limit);

    this.offset = this.limit * offset;
    this.firstPage = 0;
    this.lastPage = this.totalPages;

    this.in_data = {
      search: this.searchTxt,
      offset: this.offset,
      limit: this.limit
    };
  }

  next() {

    let offset = ((this.currentPage + 1) - 1) * this.limit;
    this.currentPage++;

    if( this.currentPage <= this.totalPages ) {

      this.restaurtantListing( offset );
    } else {
      this.currentPage--;  
    }
  }

  prev() {

    let offset = ((this.currentPage - 1) - 1) * this.limit;
    this.currentPage--;

    if( this.currentPage > 0 ) {

      this.restaurtantListing( offset );
    } else {
      this.currentPage++;
    }
  }

  first() {
    this.currentPage = 1;
    this.restaurtantListing( 0 );
  }

  last() {

    let offset = ((this.totalPages - 1) * this.limit);
    this.currentPage = this.totalPages;
    this.restaurtantListing( offset );
  }

  restaurtantListing( offset ) {

    this.in_data = {
      search: this.searchTxt,
      offset: offset,
      limit: this.limit
    };
    this.restaurantService.restaurtantListing( this.in_data ).subscribe(
      result => {
        console.log('result', result);
        this.spinner.hide();
        
        if( result.status == 200) {
          this.users = '';
          this.totalRecords = 0;
          this.users = result.data.rows;
          console.log('this.users', this.users);
          this.totalRecords = result.cnt;
          this.generatePagination( this.in_data );          
        } else {
          console.log( alert(result.msg) );
        }
      },
      error => {
        this.spinner.hide();
        console.log('error');
        console.log(error);
        this.showPagination = false;
        return [];
      }
    );
  }

  search( e ) {
    
    this.searchTxt = e.target.value;
    this.offset = 0;
    this.in_data = {
      search: this.searchTxt,
      offset: this.offset,
      limit: this.limit
    };
    this.restaurtantListing( this.offset );
  }

  goToLink(url: string) {
    localStorage.setItem('QrCode', url);
    window.open('http://localhost:4200/qr', "_blank");
  }

  // goToLink(url: string){
  //   console.log('url', url);
  //   localStorage.setItem('QrCode', url);
  //   this.router.navigate(['/qr']);
  // }

}
