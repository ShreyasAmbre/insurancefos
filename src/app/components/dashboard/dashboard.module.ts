import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { JobListComponent } from './job-list/job-list.component';
import { JobSummeryComponent } from './job-summery/job-summery.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CountHeaderComponent } from './shared/count-header/count-header.component';
import { MotorTableComponent } from './shared/motor-table/motor-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { PaginatorModule } from 'primeng/paginator';
import { AssignJobPopupComponent } from './shared/assign-job-popup/assign-job-popup.component';
import { CancelInfoComponent } from './shared/cancel-info/cancel-info.component';
import { HealthTableComponent } from './shared/health-table/health-table.component';
import { SharedModule } from '../../common/shared.module';
import { DateRangeSelectorComponent } from './shared/date-range-selector/date-range-selector.component';
import { CalendarModule } from 'primeng/calendar';
import { RescheduleJobComponent } from './shared/reschedule-job-popup/reschedule-job.component';
import { RelatedDataComponent } from './shared/related-data/related-data.component';
import { ImgGalleryComponent } from './shared/img-gallery/img-gallery.component';
import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    JobSummeryComponent,
    JobListComponent,
    CountHeaderComponent,
    MotorTableComponent,
    AssignJobPopupComponent,
    CancelInfoComponent,
    HealthTableComponent,
    DateRangeSelectorComponent,
    RescheduleJobComponent,
    RelatedDataComponent,
    ImgGalleryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    PaginatorModule,
    CalendarModule,
    ImageModule
  ],
})
export class DashboardModule { }
