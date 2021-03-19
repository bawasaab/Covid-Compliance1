import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-visitor-report',
  templateUrl: './visitor-report.component.html',
  styleUrls: ['./visitor-report.component.css']
})
export class VisitorReportComponent implements OnInit {

  // datePicker starts
  public minFromDt = moment().subtract(10, 'years');
  // public maxFromDt = moment().format('YYYY-MM-DD');
  public fromDt = moment().format('YYYY-MM-DD');
  
  public minToDt;
  // public maxToDt = moment().format('YYYY-MM-DD');
  public toDt;
  // datePicker ends

  visitorReportForm: FormGroup;
  public totalVisitorCnt = 0;
  public todaysVisitorCnt = 0;
  public todaysVisitors;
  public restaurantId;
  public isRestrauantIdProvidedFlag = false;
  public restaurantData;
  public fileUrl;
  public totalVisitor:any = [];
  public selectedRestaurant;
  public isChkBxChecked = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private visitorService: VisitorService,
    private spinner: NgxSpinnerService,
    private constantsService: ConstantsService,
    private sanitizer: DomSanitizer
  ) {

    let one_day_ahead_dt = moment( this.fromDt, 'YYYY-MM-DD').add( 1, 'days' );
    let one_day_ahead_str = moment( one_day_ahead_dt, 'YYYY-MM-DD').format('YYYY-MM-DD');
    this.toDt = one_day_ahead_str;
    this.minToDt = one_day_ahead_str;

    this.restaurtantListing(0);
  }

  ngOnInit(): void {
    this.visitorReportForm = new FormGroup({
      selectedRestaurant: new FormControl()
   });
  }

  getVisitorByRestaurantId() {

    this.visitorService.getVisitorByRestaurantId( this.restaurantId ).subscribe(
      result => {
        console.log('result', result);
        this.spinner.hide();
        
        if( result.status == 200) {
          this.totalVisitorCnt = result.data.cnt ? result.data.cnt : 0;
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

  getVisitorsCsv() {

    let one_day_ahead_dt = moment( this.toDt, 'YYYY-MM-DD').add( 1, 'days' );
    let one_day_ahead_str = moment( one_day_ahead_dt, 'YYYY-MM-DD').format('YYYY-MM-DD');
    let toDt = one_day_ahead_str;

    let restaurantId = this.restaurantId;
    this.visitorService.getVisitorsCsv( restaurantId, this.fromDt, toDt ).subscribe(
      result => {
        console.log('result', result);
        let vistors;
        let restaurant;
        
        this.spinner.hide();
        
        if( result.status == 200) {
          vistors = result.data.rows;
          restaurant = result.data.restaurant_detail;
          console.log('restaurant', restaurant);
          console.log('vistors', vistors);
          this.totalVisitor = [];
          if( vistors !== undefined ) {

            vistors.forEach(element => {
  
              let visit_date = moment( element.create_date, "YYYY-MM-DD HH:mm:ss" );
  
              this.totalVisitor.push({
                restaurant_id: element.restaurant_id,
                restaurant_name: restaurant.restaurant_name,
                restaurant_address: restaurant.restaurant_addr,
                visitor_name: element.name,
                visitor_contact: element.contact,
                table_number: element.table_number,
                visit_date: visit_date
              });
            });
            this.saveAsCsv( restaurant.restaurant_name, restaurant.restaurant_addr, restaurantId );
          } else {
            Swal.fire(
              'Record not found.',
              'Visitors are not checked in yet.',
              'error'
            );
          }
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

  restaurtantListing( offset ) {

    let in_data = {
      search: '',
      offset: 0,
      limit: 10
    };
    this.restaurantService.restaurtantListing( in_data ).subscribe(
      result => {
        console.log('restaurtantListing result', result);
        this.spinner.hide();
        
        if( result.status == 200) {
          this.restaurantData = result.data.rows;
          if( this.restaurantData !== undefined ) {
            this.selectRestaurantData( this.restaurantData[0]._id );
          }
          console.log('this.restaurantData', this.restaurantData);
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

  selectRestaurantData( selectedRestaurant ) {
    this.restaurantId = this.selectedRestaurant = selectedRestaurant;
    this.visitorReportForm.patchValue({
      selectedRestaurant: this.selectedRestaurant
    });
    this.getVisitorByRestaurantId();
  }

  setFormData() {
    this.visitorReportForm.patchValue({
      selectedRestaurant: this.restaurantData.selectedRestaurant
    });
  }

  go( e ) {

    this.restaurantId = e.target.value;
    this.getVisitorByRestaurantId();
  }

  onSubmit() {

  }

  setfromDateChanged( dt ) {

    this.fromDt = moment(dt, 'YYYY-MM-DD').format('YYYY-MM-DD');
    let one_day_ahead_dt = moment(dt, 'YYYY-MM-DD').add( 1, 'days' );
    console.log('one_day_ahead_dt', one_day_ahead_dt);
    let one_day_ahead_str = moment( one_day_ahead_dt, 'YYYY-MM-DD').format('YYYY-MM-DD');
    console.log('one_day_ahead_str', one_day_ahead_str);
    this.minToDt = moment( one_day_ahead_str, 'YYYY-MM-DD').format('YYYY-MM-DD');
    this.toDt = this.minToDt;
  }

  setToDateChanged( dt ) {

    this.toDt = moment( dt, 'YYYY-MM-DD').format('YYYY-MM-DD');
  }
}