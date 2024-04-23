import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PpnMasterRoutingModule } from './ppn-master-routing.module';
import { PpnMasterComponent } from './ppn-master/ppn-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PipesModule } from '../../pipes/pipes.module';
import { CreatePPNComponent } from './create-ppn/create-ppn.component';
import { SharedModule } from '../../common/shared.module';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TreeModule } from 'primeng/tree';
import { CalendarModule } from 'primeng/calendar';
import { SelectAccessAreaComponent } from './select-access-area/select-access-area.component';

@NgModule({
  declarations: [
    PpnMasterComponent,
    CreatePPNComponent,
    SelectAccessAreaComponent
 
  ],
  imports: [
    CommonModule,
    PpnMasterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    SharedModule,
    PaginatorModule,
    DropdownModule,
    MultiSelectModule,
    ToastModule,
    CalendarModule,
    DynamicDialogModule,
    TreeModule
  ]
})
export class PpnMasterModule { }
