import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {

  qr;
  isQrProvidedFlag;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // this.setQr();
    this.qr = localStorage.getItem('QrCode');
    console.log('this.qr', this.qr);
  }

  setQr() {

    this.route.params.subscribe( params => {      
      this.qr = params.qrCode;
      this.isQrProvidedFlag = this.qr ? true : false;

    });
  }
}
