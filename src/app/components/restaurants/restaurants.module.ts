import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// DateTimePickerModule
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

import { SharedModule } from "../shared/shared.module";

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { ListComponent } from './list/list.component';
import { MasterComponent } from './master/master.component';
import { CheckinsComponent } from './checkins/checkins.component';
import { VisitorReportComponent } from './visitor-report/visitor-report.component';


@NgModule({
  declarations: [ListComponent, MasterComponent, CheckinsComponent, VisitorReportComponent],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DateTimePickerModule
  ]
})
export class RestaurantsModule { }
