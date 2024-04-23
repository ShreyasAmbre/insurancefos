import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapacityHomeComponent } from './capacity-home/capacity-home.component';

const routes: Routes = [
  { path: "", component: CapacityHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacityManagementRoutingModule { }
