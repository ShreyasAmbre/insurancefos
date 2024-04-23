import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAreaComponent } from './select-area/select-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from '../login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PpnMapSelectorComponent } from './ppn-map-selector/ppn-map-selector.component';
import { SelectSlotComponent } from './select-slot/select-slot.component';
import { CalendarModule } from 'primeng/calendar';
import { MainHeaderComponent } from './main-header/main-header.component';
import { DigitOnlyDirective } from '../directives/digit-only.directive';
import { ToastModule } from 'primeng/toast';
import { CustomToasterComponent } from './custom-toaster/custom-toaster.component';
import { InputfocusDirective } from '../directives/inputfocus.directive';
import { TreeModule } from 'primeng/tree';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CommaSeparatedDirectiveTsDirective } from '../directives/comma-separated.directive.ts.directive';
import { SlotCalendarComponent } from './slot-calendar/slot-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DropdownModule } from 'primeng/dropdown';
import { TouppercaseDirective } from '../directives/touppercase.directive';
import { SpecialCharDirective } from '../directives/special-char.directive';


@NgModule({
  declarations: [
    SelectAreaComponent,
    SideNavComponent,
    LoginComponent,
    HeaderComponent,
    MainHeaderComponent,
    PpnMapSelectorComponent,
    SelectSlotComponent,
    DigitOnlyDirective,
    CustomToasterComponent,
    InputfocusDirective,
    CommaSeparatedDirectiveTsDirective,
    SlotCalendarComponent,
    TouppercaseDirective,
    SpecialCharDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CalendarModule,
    ToastModule,
    TreeModule,
    DynamicDialogModule,
    FullCalendarModule,
    DropdownModule
  ],
  exports: [
    SelectAreaComponent,
    SideNavComponent,
    LoginComponent,
    HeaderComponent,
    PpnMapSelectorComponent,
    SelectSlotComponent,
    MainHeaderComponent,
    DigitOnlyDirective,
    CustomToasterComponent,
    InputfocusDirective,
    CommaSeparatedDirectiveTsDirective,
    SlotCalendarComponent,
    TouppercaseDirective,
    SpecialCharDirective

  ]
})
export class SharedModule { }
