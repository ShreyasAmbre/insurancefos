import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreTradeZoneRoutingModule } from './store-trade-zone-routing.module';
import { TradeZoneDashboardComponent } from './trade-zone-dashboard/trade-zone-dashboard.component';
import { ServiceableAreaManagementComponent } from './serviceable-area-management/serviceable-area-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from '../../common/shared.module';
import { PinMapComponent } from './shared/pin-map/pin-map.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TradeZoneDashboardComponent,
    ServiceableAreaManagementComponent,
    PinMapComponent,
  ],
  imports: [
    CommonModule,
    StoreTradeZoneRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DropdownModule,
    MultiSelectModule,
    InputSwitchModule,
    PipesModule
  ]
})
export class StoreTradeZoneModule { }
