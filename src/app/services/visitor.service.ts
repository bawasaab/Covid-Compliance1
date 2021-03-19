import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators";

import { ConstantsService } from "./constants.service";
// import { JwtInterceptorService } from "./jwt-interceptor.service";

import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  public apiEndPoint:string;
  public data;

  constructor(
    private httpClient: HttpClient,
    private constantsService: ConstantsService,
    // private JwtInterceptorService: JwtInterceptorService
  ) {
    this.apiEndPoint = this.constantsService.apiBaseUrl + '/visitors';
  }

  getAllVisitors():Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
       'Authorization': this.constantsService.token
      })
    };
    
    let url = `${this.apiEndPoint}`;
    return this.httpClient.get( 
        url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getTodaysVisitors():Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
       'Authorization': this.constantsService.token
      })
    };

    let url = `${this.apiEndPoint}/todaysVisitors`;
    return this.httpClient.get( 
        url )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getVisitorsCsv( restaurantId, frm, to ):Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
       'Authorization': this.constantsService.token
      })
    };
    let url = `${this.apiEndPoint}/restaurant/${restaurantId}?frm=${frm}&to=${to}`;
    return this.httpClient.get( 
        url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getVisitorByRestaurantId( restaurantId ):Observable<any>{
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Authorization': this.constantsService.token
      })
    };
    
    let fromDt = moment().format('YYYY-MM-DD');
    let one_day_ahead_dt = moment(fromDt, 'YYYY-MM-DD').add( 1, 'days' );
    let one_day_ahead_str = moment( one_day_ahead_dt, 'YYYY-MM-DD').format('YYYY-MM-DD');
    let toDt = moment( one_day_ahead_str, 'YYYY-MM-DD').format('YYYY-MM-DD');
    
    let url = `${this.apiEndPoint}/restaurant/${restaurantId}?frm=${fromDt}&to=${toDt}`;
    return this.httpClient.get( 
        url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getVisitorCountByRestaurantId( restaurantId ):Observable<any>{
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Authorization': this.constantsService.token
      })
    };
    
    let url = `${this.apiEndPoint}/count/restaurant/${restaurantId}`;
    return this.httpClient.get( 
        url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }
}