import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators";

import { ConstantsService } from "./constants.service";
// import { JwtInterceptorService } from "./jwt-interceptor.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiEndPoint:string;
  public data;

  constructor(
    private httpClient: HttpClient,
    private constantsService: ConstantsService,
    // private JwtInterceptorService: JwtInterceptorService
  ) {
    this.apiEndPoint = this.constantsService.apiBaseUrl + '/admin';
  }

  insertUser( in_data, imageLink ):Observable<any>{

    let formData: FormData = new FormData(); 
    formData.append('userName', in_data.userName); 
    formData.append('universityEmail', in_data.universityEmail);
    formData.append('password', in_data.password);
    formData.append('gender', in_data.gender);
    formData.append('studyingYear', in_data.studyingYear);
    formData.append('countryIds', in_data.countryIds);
    formData.append('branchId', in_data.branchId);
    formData.append('groupIds', in_data.groupIds);
    formData.append('imageLink', imageLink);
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token
      })
    };

    return this.httpClient.post( 
      `${this.apiEndPoint}/users`, 
      formData,
      httpOptions
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  updateUser( in_data ):Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token,
       'Content-Type':"application/json"
      })
    };

    return this.httpClient.patch( 
      `${this.apiEndPoint}/users`, 
      in_data,
      httpOptions
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getUserListing( in_data ):Observable<any>{
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token,
       'Content-Type':"application/json"
      })
    };
    let url = `${this.apiEndPoint}/users?offset=${in_data.offset}&limit=${in_data.limit}`;
    in_data.search.length ? url += `&search=${in_data.search}` : '';
    return this.httpClient.get( url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  deleteUserByUserId( userId ):Observable<any>{
    
    const options = {
      headers: new HttpHeaders({
        'Token': this.constantsService.token
      }),
      body: {
        id: userId
      }
    };

    // let url = `${this.apiEndPoint}/users`;
    let url = `${this.apiEndPoint}/users/hard`;
    return this.httpClient.delete(
      url,
      options
    )
    .pipe(
      map((e:Response)=> e),
      catchError((e:Response)=> throwError(e))
    );
  }

  getUserById( userId ):Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token,
       'Content-Type':"application/json"
      })
    };

    let url = `${this.apiEndPoint}/users/${userId}`;
    return this.httpClient.get( url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  modifyUserProfilePic( userId, imageLink ):Observable<any>{

    let formData: FormData = new FormData(); 
    formData.append('id', userId);
    formData.append('imageLink', imageLink);
    
    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token
      })
    };

    return this.httpClient.post( 
      `${this.apiEndPoint}/users/profilePic`, 
      formData,
      httpOptions
      )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }

  getAllUsers():Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
       'Token': this.constantsService.token,
       'Content-Type':"application/json"
      })
    };
    
    let url = `${this.apiEndPoint}/users`;
    return this.httpClient.get( url, httpOptions )
      .pipe(
        map((e:Response)=> e),
        catchError((e:Response)=> throwError(e))
      );
  }
}