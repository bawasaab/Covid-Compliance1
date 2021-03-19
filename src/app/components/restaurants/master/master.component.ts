import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { ConstantsService } from "../../../services/constants.service";
import { RestaurantService } from "../../../services/restaurant.service";

import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { textSpanIntersectsWithPosition } from 'typescript';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  
  restaurantForm: FormGroup;
  submitted = false;
  isRestrauantIdProvidedFlag = false;
  restaurantId;
  restaurantData;
  imageUrl = this.constantsService.userImageLink;
  headerTxt = 'Add Location';
  buttonTxt = 'Submit';
  isLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private constantsService: ConstantsService,
    private restaurantService: RestaurantService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.setRestaurantId();

    this.restaurantForm = this.formBuilder.group({
      restaurant_name: ['', Validators.required],
      restaurant_addr: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.restaurantForm.controls; }

  setRestaurantId() {

    this.route.params.subscribe( params => {      
    this.restaurantId = params.restaurantId;
    this.isRestrauantIdProvidedFlag = this.restaurantId ? true : false;

      if( this.isRestrauantIdProvidedFlag ) {
        this.isLoaded = false;
        this.getRestaurantById();
      } else {
        this.isLoaded = true;
      }
    });
  }

  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.restaurantForm.invalid) {
      return;
    }

    if( this.isRestrauantIdProvidedFlag ) {

      this.update();
    } else {

      this.insert();
    }
  }

  update() {

    let in_data = this.restaurantForm.value;
    console.log('in_data', in_data);
    this.restaurantService.updateRestaurant( in_data, this.restaurantId )
        .subscribe(
          result => {
            this.spinner.hide();
            console.log('result', result);
            
            if( result.status == 200 ) {
              
              this.router.navigate(['/restaurants/listing']);              
              Swal.fire(
                result.msg,
                result.msg,
                'success'
              );
            } else {

              Swal.fire(
                result.msg,
                result.msg,
                'error'
              );
            }
          },
          error => {
            this.spinner.hide();
            console.log('error');
            console.log(error);

            Swal.fire(
              error,
              error,
              'error'
            );
          }
      );
  }

  insert() {

    this.restaurantData = this.restaurantForm.value;
    this.setFormData();
    console.log('in_data', this.restaurantData);
    this.restaurantService.insertRestaurant( this.restaurantData )
        .subscribe(
          result => {
            this.spinner.hide();
            console.log('result', result);
            
            if( result.status == 200 ) {
              
              this.generateQrCode( result.data.rows._id );
            } else {

              Swal.fire(
                result.msg,
                result.msg,
                'error'
              );
            }
          },
          error => {
            this.spinner.hide();
            console.log('error');
            console.log(error);

            Swal.fire(
              error,
              error,
              'error'
            );
          }
      );
  }

  generateQrCode( in_restaurant_id ) {

    this.restaurantService.generateQrCode( in_restaurant_id )
        .subscribe(
          result => {
            this.spinner.hide();
            console.log('result', result);
            
            if( result.status == 200 ) {
              
              this.router.navigate([`/restaurants/${in_restaurant_id}/checkins`]);
              Swal.fire(
                '‘QRcode assigned successfully for new location',
                // result.msg,
                'Please select ‘Go to location ’button’ to view',
                'success'
              );
            } else {

              Swal.fire(
                result.msg,
                result.msg,
                'error'
              );
            }
          },
          error => {
            this.spinner.hide();
            console.log('error');
            console.log(error);

            Swal.fire(
              error,
              error,
              'error'
            );
          }
      );
  }

  getRestaurantById() {

    this.spinner.show();
    this.restaurantService.getRestaurantById( this.restaurantId ).subscribe(
      result => {
        console.log('result get rest', result);

        if( result.status == 200 ) {
          this.restaurantData = result.data.rows;
          this.isLoaded = true;
          this.setFormData();
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

  setFormData() {
    this.restaurantForm.patchValue({
      restaurant_name: this.restaurantData.restaurant_name,
      restaurant_addr: this.restaurantData.restaurant_addr
    });
  }
}
