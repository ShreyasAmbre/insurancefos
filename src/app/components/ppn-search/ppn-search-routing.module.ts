import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PpnSearchHomeComponent } from './ppn-search-home/ppn-search-home.component';

const routes: Routes = [
  {
    path: '', component: PpnSearchHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PpnSearchRoutingModule { }
