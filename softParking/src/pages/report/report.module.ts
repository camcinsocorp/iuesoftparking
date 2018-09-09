import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportPage } from './report';
import { NgxChartsModule } from '@swimlane/ngx-charts';
@NgModule({
  declarations: [
    ReportPage,
  ],
  imports: [
  	NgxChartsModule, 
    IonicPageModule.forChild(ReportPage),
  ],
  exports:[ReportPage]
})
export class ReportPageModule {}
