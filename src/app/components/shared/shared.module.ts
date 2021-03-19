import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';
import { MainSidebarComponent } from './include/main-sidebar/main-sidebar.component';
import { ContentWrapperComponent } from './include/content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from './include/control-sidebar/control-sidebar.component';
import { CommonComponent } from './include/common/common.component';
import { CommonHeaderComponent } from './include/common-header/common-header.component';
import { CommonFooterComponent } from './include/common-footer/common-footer.component';

@NgModule({
  declarations: [
    CommonHeaderComponent,
    CommonFooterComponent,
    HeaderComponent,
    FooterComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    ControlSidebarComponent,
    CommonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonHeaderComponent,
    CommonFooterComponent,
    HeaderComponent,
    FooterComponent,
    MainSidebarComponent,
    ContentWrapperComponent,
    ControlSidebarComponent,
    CommonComponent
  ]
})
export class SharedModule { }
