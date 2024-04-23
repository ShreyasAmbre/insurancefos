import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceableAreaManagementComponent } from './serviceable-area-management/serviceable-area-management.component';
import { TradeZoneDashboardComponent } from './trade-zone-dashboard/trade-zone-dashboard.component';

const routes: Routes = [
  { path: 'tradezone', component: TradeZoneDashboardComponent },
  { path: 'servicearea', component: ServiceableAreaManagementComponent },
  { path: '', redirectTo: 'tradezone', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTradeZoneRoutingModule { }
