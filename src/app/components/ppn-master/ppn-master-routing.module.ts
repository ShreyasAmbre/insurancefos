import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PpnMasterComponent } from './ppn-master/ppn-master.component';

const routes: Routes = [
  {
    path: '', component: PpnMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PpnMasterRoutingModule { }
