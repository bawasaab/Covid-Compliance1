import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from "./list/list.component";
import { MasterComponent } from "./master/master.component";
import { CheckinsComponent } from "./checkins/checkins.component";
import { VisitorReportComponent } from "./visitor-report/visitor-report.component";

const routes: Routes = [{
  path: 'reports/visitor',
  component: VisitorReportComponent
},
{
  path: 'listing',
  component: ListComponent
},
{
  path: ':restaurantId/checkins',
  component: CheckinsComponent
},
{
  path: 'master/:restaurantId',
  component: MasterComponent
},
{
  path: 'master',
  component: MasterComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
