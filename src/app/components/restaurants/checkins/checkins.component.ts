import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';

import { ConstantsService } from "../../../services/constants.service";
import { RestaurantService } from "../../../services/restaurant.service";
import { VisitorService } from "../../../services/visitor.service";
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import * as moment from 'moment';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-checkins',
  templateUrl: './checkins.component.html',
  styleUrls: ['./checkins.component.css']
})
export class CheckinsComponent implements OnInit {

  public totalVisitorCnt = 0;
  public todaysVisitorCnt = 0;
  public todaysVisitors;
  public restaurantId;
  public isRestrauantIdProvidedFlag = false;
  public restaurantData;
  public fileUrl;
  public totalVisitor:any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private visitorService: VisitorService,
    private spinner: NgxSpinnerService,
    private constantsService: ConstantsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.setRestaurantId();
  }

  setRestaurantId() {

    this.route.params.subscribe( params => {      
    this.restaurantId = params.restaurantId;
    this.isRestrauantIdProvidedFlag = this.restaurantId ? true : false;

      if( this.isRestrauantIdProvidedFlag ) {
        // this.getAllVisitors();
        this.getVisitorCountByRestaurantId( this.restaurantId );
        this.getVisitorByRestaurantId();
        // this.getTodaysVisitors();
        this.getRestaurantById();
      } else {}
    });
  }

  getRestaurantById() {

    this.spinner.show();
    this.restaurantService.getRestaurantById( this.restaurantId ).subscribe(
      result => {
        console.log('result get rest', result);

        if( result.status == 200 ) {
          this.restaurantData = result.data.rows;
          console.log('this.restaurantData', this.restaurantData);
        } else {
          Swal.fire(
            'error',
            result.msg,
            result.msg
          );
        }
      },
      error => {
        this.spinner.hide();
        console.log('error');
        console.log(error);
        Swal.fire(
          'error',
          error,
          error
        );
      }
    );
  }

  getAllVisitors() {

    this.visitorService.getAllVisitors().subscribe(
      result => {
        console.log('result', result);
        this.spinner.hide();
        
        if( result.status == 200) {
          this.totalVisitorCnt = result.data.cnt;
          // this.todaysVisitors = result.data.rows;
        } else {
          console.log( alert(result.msg) );
        }
      },
      error => {
        this.spinner.hide();
        console.log('error');
        console.log(error);
        return [];
      }
    );
  }

  getVisitorCountByRestaurantId( restaurantId ) {

    this.visitorService.getVisitorCountByRestaurantId( restaurantId ).subscribe(
      result => {
        console.log('result', result);
        this.spinner.hide();
        
        if( result.status == 200) {
          this.totalVisitorCnt = result.data.cnt;
          // this.todaysVisitors = result.data.rows;
        } else {
          console.log( alert(result.msg) );
        }
      },
      error => {
        this.spinner.hide();
        console.log('error');
        console.log(error);
        return [];
      }
    );
  }

  getVisitorByRestaurantId() {

    this.visitorService.getVisitorByRestaurantId( this.restaurantId ).subscribe(
      result => {
        console.log('result', result);
        this.spinner.hide();
        
        if( result.status == 200) {
          // this.totalVisitorCnt = result.data.cnt ? result.data.cnt : 0;
          this.todaysVisitors = result.data.rows;
        } else {
          console.log( alert(result.msg) );
        }
      },
      error => {
        this.spinner.hide();
        console.log('error');
        console.log(error);
        return [];
      }
    );
  }

  getTodaysVisitors() {

    this.visitorService.getTodaysVisitors().subscribe(
      result => {
        console.log('result', result);
        this.spinner.hide();
        
        if( result.status == 200) {
          // this.todaysVisitorCnt = result.data.cnt ? result.data.cnt : 0;
          // this.todaysVisitors = result.data.rows;
        } else {
          console.log( alert(result.msg) );
        }
      },
      error => {
        this.spinner.hide();
        console.log('error');
        console.log(error);
        return [];
      }
    );
  }

  public base64ToBlob(b64Data, contentType='', sliceSize=512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }

  downloadFile( restaurantId ) {
    
    // let imgUrl = this.constantsService.baseUrl +'/downloadQrCode/'+ restaurantId;
    let imgUrl = this.constantsService.apiBaseUrl +'/downloadQrCode/'+ restaurantId;
    saveAs( imgUrl, restaurantId +".png" );
  }

  saveAsCsv( restaurant_name, restaurant_addr, restaurantId ) {

    let data: any;
    data = this.totalVisitor;
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    let fileName = restaurant_name +'-'+ restaurant_addr +'-'+ restaurantId;
    saveAs(blob, fileName +'.csv' );
  }
}
