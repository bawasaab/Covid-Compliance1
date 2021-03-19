import { Component, OnInit } from '@angular/core';
import { ConstantsService } from "../services/constants.service";
import { CheckoutService } from "../services/checkout.service";
import { UserService } from "../services/user.service";
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trial-or-checkout',
  templateUrl: './trial-or-checkout.component.html',
  styleUrls: ['./trial-or-checkout.component.css']
})
export class TrialOrCheckoutComponent implements OnInit {

  handler:any = null;
  public amt:any = 0;
  public checkoutEmail:any = null;
  
  constructor(
    private constantsService: ConstantsService,
    private checkoutService: CheckoutService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private userService: UserService
  ) {
    this.checkoutEmail = localStorage.getItem( 'checkoutEmail' );
  }

  ngOnInit(): void {
    this.loadStripe();
  }

  async pay(amount) {    
    
    let $this = this;
    var handler = await (<any>window).StripeCheckout.configure({
      key: this.constantsService.stripe_Publishable_key,
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        // alert('Token Created!!');
        
        $this.paymentSuccessfull( token, amount );
      }
    });
 
    handler.open({
      name: 'Humdine',
      description: 'Payment for humdine membership',
      amount: amount * 100
    });
  }

  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }

  paymentSuccessfull( token, amount ) {

    let $this = this;

    let in_data = {
      stripeEmail: token.email,
      stripeToken: token.id,
      name: token.card.name,
      amount: amount,
      description: 'Payment for humdine membership',
      currency: 'AUD',
      userId: localStorage.getItem( 'checkoutUserId' )
    };

    this.checkoutService.paymentSuccessFull( in_data )
        .subscribe(
          result => {
            this.spinner.hide();
            console.log('result', result);
            if( result.status == 200 ) {
              Swal.fire(
                'Payment Successful.',
                // result.msg,
                // result.msg
                'Thank you for your payment, please login to go to your Humdine dashboard.'
                );
              this.router.navigate(['/login']);
              // $this
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
              error.msg,
              error
            );
          }
        );
  }
}
