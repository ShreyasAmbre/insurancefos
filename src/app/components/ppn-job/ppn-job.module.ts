import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PpnJobRoutingModule } from './ppn-job-routing.module';
import { PpnCreateJobComponent } from './ppn-create-job/ppn-create-job.component';
import { SharedModule } from '../../common/shared.module';
import { PpnInfoComponent } from './motor/shared-job/ppn-info/ppn-info.component';
import { CustomerInfoComponent } from './motor/shared-job/customer-info/customer-info.component';
import { PpnPickupComponent } from './motor/ppn-pickup/ppn-pickup.component';
import { PpnDropComponent } from './motor/ppn-drop/ppn-drop.component';
import { PpnInspectionComponent } from './motor/ppn-inspection/ppn-inspection.component'
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WynHospitalComponent } from './health/wyn-hospital/wyn-hospital.component';
import { WynReimburseComponent } from './health/wyn-reimburse/wyn-reimburse.component';
import { PocDetailsComponent } from './health/shared-health/poc-details/poc-details.component';
import { PickupLocationComponent } from './health/shared-health/pickup-location/pickup-location.component';
import { CustomerHealthInfoComponent } from './health/shared-health/customer-health-info/customer-health-info.component';
import { CalendarModule } from 'primeng/calendar';
import { MotorClaimComponent } from './motor/shared-job/motor-claim/motor-claim.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { EditJobComponent } from './motor/edit-job/edit-job.component';

@NgModule({
  declarations: [
    PpnCreateJobComponent,
    PpnInfoComponent,
    CustomerInfoComponent,
    PpnPickupComponent,
    PpnDropComponent,
    PpnInspectionComponent,
    WynHospitalComponent,
    WynReimburseComponent,
    PocDetailsComponent,
    PickupLocationComponent,
    CustomerHealthInfoComponent,
    MotorClaimComponent,
    EditJobComponent
  ],
  imports: [
    CommonModule,
    PpnJobRoutingModule,
    SharedModule,
    DropdownModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
  ]
})
export class PpnJobModule { }
