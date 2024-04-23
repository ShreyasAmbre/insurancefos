import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AssetsManagementRoutingModule } from './assets-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../common/shared.module";
import { PipesModule } from "../../pipes/pipes.module";
// import { NgSelectModule } from '@ng-select/ng-select';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { CreateassetFormComponent } from './createasset-form/createasset-form.component';
import { AssetsManagementHomeComponent } from './assets-management-home/assets-management-home.component';
import { SelectPrimaryAccessComponent } from './select-primary-access/select-primary-access.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TreeModule } from 'primeng/tree';
@NgModule({
    declarations: [
    AssetsManagementHomeComponent,
    CreateassetFormComponent,
    SelectPrimaryAccessComponent,

    ],
    imports: [
      CommonModule,
      AssetsManagementRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      PipesModule,
      PaginatorModule,
      DropdownModule,
      MultiSelectModule,
      CalendarModule,
      ToastModule,
      DynamicDialogModule,
      TreeModule
    ]
})
export class AssetsManagementModule { }
