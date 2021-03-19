import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialOrCheckoutComponent } from './trial-or-checkout.component';

describe('TrialOrCheckoutComponent', () => {
  let component: TrialOrCheckoutComponent;
  let fixture: ComponentFixture<TrialOrCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialOrCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialOrCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
