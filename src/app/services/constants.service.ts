import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  // public baseUrl: string = `http://localhost:3000`;
  // public baseUrl: string = `http://ec2-13-236-87-146.ap-southeast-2.compute.amazonaws.com:3000`;
  // public baseUrl: string = `http://humdine.com:3000`;
  public baseUrl: string = `https://humdine.com:8443`;
  public apiBaseUrl: string = `${this.baseUrl}/api1`;
    
  public userImageLink: string;
  public token: string;
  public user;
  public userProfilePic: string;
  public pollImageLink: string;
  public paginationLimit: number;
  public stripe_Publishable_key: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

    // this.baseUrl = `http://localhost:3000/api1`;

    // this.userImageLink = `${this.baseUrl}/storage/`;
    // this.pollImageLink = `${this.baseUrl}/storage/polls/`;
    this.paginationLimit = 10;
    this.stripe_Publishable_key = 'pk_live_83msQRRmSER3tzZr2aGAcQYj00zazhb49q';
  }

  setLocalStorage() {

    let currentUrl = this.router.routerState.snapshot.url;
    let byPassUrls = [
      '/login',
      '/trailOrCheckout',
    ];

    if ( localStorage.getItem("currentUser") === null || localStorage.getItem("currentUser") === undefined ) {
      if( !byPassUrls.includes( currentUrl ) ) {
        this.router.navigate([`/login`]);
      }
      
    } else {
      
      let user = JSON.parse( localStorage.getItem('currentUser') );
      this.user = user.user;
      this.token = user.token;
    }
  }
}
