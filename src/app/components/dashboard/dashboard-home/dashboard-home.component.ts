import { Component } from '@angular/core';
import { FormGroup, FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { SelectAreaComponent } from '../../../common/select-area/select-area.component';
import { StoretradeService } from '../../../services/storetrade/storetrade.service';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  providers: [DialogService]
})
export class DashboardHomeComponent {
  customerSearchForm: FormGroup = new FormGroup([]);
  selectAccessDialogRef: DynamicDialogRef | undefined;
  toasterStatus: boolean = false
  userData:any;
  zoneAreaListCount: any;

  constructor(
    private formBuilder: FormBuilder, public dialogService: DialogService, private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.searchFormBuilder();
    this.onSearchTermChange();

    this.userData = JSON.parse(sessionStorage.getItem('userData') || '');
    this.zoneAreaListCount = this.userData.zoneAccessArea.split(",").length > 0 ? this.userData.zoneAccessArea.split(",").length - 1 : ""
  }

  searchFormBuilder() {
    this.customerSearchForm = this.formBuilder.group({
      searchInput: ["", ValidationConstants.nameValidation],
    });
  }

  onSearchTermChange() {
    this.customerSearchForm.get('searchInput')?.valueChanges.subscribe((value: any) => {
      this.dashboardService.searchInputValue.next(value)
    });
  }

  openSelectAccess() {
    this.selectAccessDialogRef = this.dialogService.open(SelectAreaComponent, {
      data: {},
      header: 'Select access area',
      width: '32%',
      height: 'auto',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.selectAccessDialogRef.onClose.subscribe((data: any) => {
      if (data.success) {
        this.dashboardService.isAccessAreaClosed.next(true)
        this.userData = JSON.parse(sessionStorage.getItem('userData') || '');
        this.zoneAreaListCount = this.userData.zoneAccessArea.split(",").length > 0 ? this.userData.zoneAccessArea.split(",").length - 1  : ""
      }
    })

  }

}
