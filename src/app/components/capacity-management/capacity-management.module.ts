import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacityManagementRoutingModule } from './capacity-management-routing.module';
import { CapacityHomeComponent } from './capacity-home/capacity-home.component';
import { DropdownModule } from 'primeng/dropdown';
import { CapacityCalenderComponent } from './capacity-calender/capacity-calender.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../common/shared.module';

@NgModule({
  declarations: [
    CapacityHomeComponent,
    CapacityCalenderComponent,
    MeetingDetailsComponent,

  ],
  imports: [
    CommonModule,
    CapacityManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    FullCalendarModule,
    CalendarModule,
    SharedModule
  ],
  providers: [DatePipe]
})
export class CapacityManagementModule { }
