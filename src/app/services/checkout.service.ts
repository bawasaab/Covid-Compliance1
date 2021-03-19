import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators";

import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  public apiEndPoint:string;
  public data;

  constructor(
    private httpClient: HttpClient,
    private constantsService: ConstantsService
  ) {
    this.apiEndPoint = this.constantsService.baseUrl
  }

  paymentSuccessFull( in_data ):Observable<any>{

    let formData: FormData = new FormData(); 
    formData.append('stripeEmail', in_data.stripeEmail); 
    formData.append('stripeToken', in_data.stripeToken);
    formData.append('name', in_data.name);
    formData.append('amount', in_data.amount);
    formData.append('description', in_data.description);
    formData.append('currency', in_data.currency);
    formData.append('userId', in_data.userId);    
    
    return this.httpClient.post( 
      `${this.apiEndPoint}/charge`, 
      formData
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }
}
