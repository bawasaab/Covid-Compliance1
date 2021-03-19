import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators";

import { ConstantsService } from "./constants.service";
// import { JwtInterceptorService } from "./jwt-interceptor.service";

@Injectable({
  providedIn: 'root'
})
export class PollService {

  public apiEndPoint:string;
  public data;

  constructor(
    private httpClient: HttpClient,
    private constantsService: ConstantsService,
    // private JwtInterceptorService: JwtInterceptorService
  ) {
    this.apiEndPoint = this.constantsService.apiBaseUrl + '/admin';
  }

  insertPoll( in_data, imageLink ):Observable<any>{

    let formData: FormData = new FormData(); 
    formData.append('userId', in_data.userId); 
    formData.append('question', in_data.question); 
    formData.append('allowComments', in_data.allowComments);
    formData.append('groupIds', in_data.groupIds);
    formData.append('genders', in_data.genders);
    formData.append('years', in_data.years);
    formData.append('countryIds', in_data.countryIds);
    formData.append('branchIds', in_data.branchIds);
    formData.append('imageLink', imageLink);
    formData.append('status', 'OPEN');
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token
      })
    };

    return this.httpClient.post( 
      `${this.apiEndPoint}/polls`, 
      // `${this.apiEndPoint}/pollsDed`, 
      formData,
      httpOptions
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  updatePoll( in_data ):Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token,
       'Content-Type':"application/json"
      })
    };
    
    return this.httpClient.patch( 
      `${this.apiEndPoint}/polls`, 
      in_data,
      httpOptions
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getPollListing( in_data ):Observable<any>{
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token,
       'Content-Type':"application/json"
      })
    };

    let url = `${this.apiEndPoint}/polls?offset=${in_data.offset}&limit=${in_data.limit}`;
    in_data.search.length ? url += `&search=${in_data.search}` : '';
    return this.httpClient.get( url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  deletePollByPollId( pollId ):Observable<any>{
    
    const options = {
      headers: new HttpHeaders({
        'Token': this.constantsService.token
      }),
      body: {
        id: pollId
      }
    };

    let url = `${this.apiEndPoint}/polls`;
    return this.httpClient.delete(
      url,
      options
    )
    .pipe(
      map((e:Response)=> e),
      catchError((e:Response)=> throwError(e))
    );
  }

  getPollById( pollId ):Observable<any>{
    
    let url = `${this.apiEndPoint}/polls/${pollId}`;
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token,
       'Content-Type':"application/json"
      })
    };
    
    return this.httpClient.get( url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  modifyPollPic( userId, pollId, imageLink ):Observable<any>{

    let formData: FormData = new FormData(); 
    formData.append('id', pollId);
    formData.append('userId', userId);
    formData.append('imageLink', imageLink);
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token
      })
    };

    return this.httpClient.post( 
      `${this.apiEndPoint}/polls/changePollPic`, 
      formData,
      httpOptions
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getAllPolls() {

    let url = `${this.apiEndPoint}/polls`;

    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token,
       'Content-Type':"application/json"
      })
    };

    return this.httpClient.get( url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getVotedPollListing( in_data ):Observable<any>{
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token,
       'Content-Type':"application/json"
      })
    };

    let url = `${this.apiEndPoint}/polls/getVotedPolls?offset=${in_data.offset}&limit=${in_data.limit}`;
    in_data.search.length ? url += `&search=${in_data.search}` : '';
    return this.httpClient.get( url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getLivePollListing( in_data ):Observable<any>{
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token,
       'Content-Type':"application/json"
      })
    };

    let url = `${this.apiEndPoint}/polls/getLivePollsAdmin?offset=${in_data.offset}&limit=${in_data.limit}`;
    in_data.search.length ? url += `&search=${in_data.search}` : '';
    return this.httpClient.get( url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  deletePollImageByPollId( pollId ):Observable<any>{
    
    const options = {
      headers: new HttpHeaders({
        'Token': this.constantsService.token
      }),
      body: {
        pollId: pollId
      }
    };

    let url = `${this.apiEndPoint}/polls/deletePollImageByPollId`;
    return this.httpClient.delete(
      url,
      options
    )
    .pipe(
      map((e:Response)=> e),
      catchError((e:Response)=> throwError(e))
    );
  }
}