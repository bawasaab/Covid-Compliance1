import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators";

import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public apiEndPoint:string;
  public data;

  constructor(
    private httpClient: HttpClient,
    private constantsService: ConstantsService
  ) {
    this.apiEndPoint = this.constantsService.apiBaseUrl + '/dashboard'
  }

  getTotalUsers():Observable<any>{
    
    return this.httpClient.get( 
      `${this.apiEndPoint}/totalUsers`
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getTotalPolls():Observable<any>{
    
    return this.httpClient.get( 
      `${this.apiEndPoint}/totalPolls`
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getTotalLivePolls():Observable<any>{
    
    return this.httpClient.get( 
      `${this.apiEndPoint}/totalLivePolls`
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getTotalVotedPolls():Observable<any>{
    
    return this.httpClient.get( 
      `${this.apiEndPoint}/totalVotedPolls`
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }
}
