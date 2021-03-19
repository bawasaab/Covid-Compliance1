import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs"
import { map, catchError } from "rxjs/operators";

import { take } from 'rxjs/operators';
// import { BehaviorSubject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

	messaging = firebase.messaging();
	currentMessage = new BehaviorSubject(null);
	
	public apiEndPoint:string;
	public data;

	constructor(
		private db: AngularFireDatabase, 
		private afAuth: AngularFireAuth, 
		private constantsService: ConstantsService,
		private httpClient: HttpClient,
	) {
		this.apiEndPoint = this.constantsService.baseUrl + '/admin/notification';
	}
	  
	saveDeviceToken( in_data ):Observable<any>{

		let formData: FormData = new FormData(); 
		formData.append('userId', in_data.userId);
		formData.append('token', in_data.token);
		formData.append('type', 'WEB');
		
		let user = JSON.parse( localStorage.getItem('currentUser') );
		let userToken = user.token;

		let httpOptions = {
			headers: new HttpHeaders({
			 'Token': userToken
			})
		};

		return this.httpClient.post( 
		  `${this.apiEndPoint}/saveUserNotification`, 
		  formData,
		  httpOptions
		  )
		  .pipe(
			map((e:Response)=> e),
			catchError((e:Response)=> throwError(e))
		  );
	  }

	updateToken(token) {

		// this.afAuth.authState.take(1).subscribe(user => {
		this.afAuth.authState.subscribe(user => {
			if (!user) return;

			const data = { [user.uid]: token }
			this.db.object('fcmTokens/').update(data)
		});
	}

	getPermission() {
		
		this.messaging.requestPermission()
		.then(() => {
			console.log('Notification permission granted.');
			let result = this.messaging.getToken();
			// console.log('result', result);
			return result;
		})
		.then(token => {
			console.log(token);
			this.updateToken(token);
			// console.log(this.constantsService); 


			let user = JSON.parse( localStorage.getItem('currentUser') );
			let userDetails = user.user;
			console.log('userDetails.id', userDetails.id);

			let in_data = {
				'userId': userDetails.id,
				'token': token
			};

			this.saveDeviceToken( in_data ).subscribe( result => {
				console.log('test');
				console.log('result');
				console.log(result);
			} );
		})
		.catch((err) => {
			console.log('Unable to get permission to notify.', err);
		});
	}

  	receiveMessage() {

		this.messaging.onMessage((payload) => {
			console.log("Message received. ", payload);
			
			let notificationTitle = payload.data.title;
			let notificationOptions = {
				body: payload.data.body,
				icon: payload.data.icon
			}
			var notification = new Notification( notificationTitle, notificationOptions );

			this.currentMessage.next(payload);
		});
	}
}
