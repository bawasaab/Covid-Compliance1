import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators";

import { ConstantsService } from "./constants.service";
// import { JwtInterceptorService } from "./jwt-interceptor.service";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  public apiEndPoint:string;
  public data;

  constructor(
    private httpClient: HttpClient,
    private constantsService: ConstantsService,
    // private JwtInterceptorService: JwtInterceptorService
  ) {
    this.apiEndPoint = this.constantsService.apiBaseUrl + '/restaurants';
  }

  insertRestaurant( in_data ):Observable<any>{

    let formData: FormData = new FormData(); 
    formData.append('restaurant_name', in_data.restaurant_name); 
    formData.append('restaurant_addr', in_data.restaurant_addr);
    // formData.append('imageLink', imageLink);
    formData.append('qr_code', '');
  
    let httpOptions = {
      headers: new HttpHeaders({
       'Authorization': this.constantsService.token
      })
    };

    return this.httpClient.post( 
      `${this.apiEndPoint}`, 
      formData,
      httpOptions
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  generateQrCode( id ):Observable<any>{

    let formData: FormData = new FormData(); 
    formData.append('id', id); 

    let httpOptions = {
      headers: new HttpHeaders({
       'Authorization': this.constantsService.token
      })
    };
    
    return this.httpClient.post( 
      `${this.apiEndPoint}/generateQrCode`, 
      formData,
      httpOptions
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }
  

  updateRestaurant( in_data, id ):Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
       'Authorization': this.constantsService.token,
      //  'Content-Type':"application/json"
      })
    };

    return this.httpClient.patch( 
      `${this.apiEndPoint}/${id}`, 
      in_data,
      httpOptions
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  restaurtantListing( in_data ):Observable<any>{
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Authorization': this.constantsService.token
      })
    };
    // let url = `${this.apiEndPoint}/users?offset=${in_data.offset}&limit=${in_data.limit}`;
    let url = `${this.apiEndPoint}`;
    // in_data.search.length ? url += `&search=${in_data.search}` : '';
    return this.httpClient.get( url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getRestaurantById( restaurantId ):Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
       'Authorization': this.constantsService.token
      })
    };

    let url = `${this.apiEndPoint}/${restaurantId}`;
    return this.httpClient.get( url, 
      httpOptions 
      ).pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }
}