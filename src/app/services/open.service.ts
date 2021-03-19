import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators";

import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: 'root'
})
export class OpenService {

  public apiEndPoint:string;
  public data;

  constructor(
    private httpClient: HttpClient,
    private constantsService: ConstantsService
  ) {
    this.apiEndPoint = this.constantsService.baseUrl;
  }

  getSignUpData():Observable<any>{
    
    return this.httpClient.get( 
      `${this.apiEndPoint}/signup/data`
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }


}
