import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PpnSearchRoutingModule } from './ppn-search-routing.module';
import { PpnSearchHomeComponent } from './ppn-search-home/ppn-search-home.component';


@NgModule({
  declarations: [
    PpnSearchHomeComponent
  ],
  imports: [
    CommonModule,
    PpnSearchRoutingModule
  ]
})
export class PpnSearchModule { }
