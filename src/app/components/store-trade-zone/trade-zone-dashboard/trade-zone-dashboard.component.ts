import { Component, OnInit } from '@angular/core';
import { StoretradeService } from '../../../services/storetrade/storetrade.service';
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { SelectAreaComponent } from '../../../common/select-area/select-area.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-trade-zone-dashboard',
  templateUrl: './trade-zone-dashboard.component.html',
  styleUrls: ['./trade-zone-dashboard.component.scss'],
  providers: [DialogService]
})
export class TradeZoneDashboardComponent implements OnInit {

  zoneList: any = []
  searchTerm: string = ""
  toasterStatus: boolean = false
  selectAccessDialogRef: DynamicDialogRef | undefined;
  itemsToShow: number = 3;
  showLoadMore: boolean = true;
  userData: any;
  zoneAreaListCount: any;


  constructor(private storeTradeService: StoretradeService, private commonService: CommonmasterService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.getZoneDetails()
    this.getToasterStatus()
    this.userData = JSON.parse(sessionStorage.getItem('userData') || '');
    this.zoneAreaListCount = this.userData.zoneAccessArea.split(",").length > 0 ? this.userData.zoneAccessArea.split(",").length - 1 : ""
  }

  getZoneDetails() {
    this.commonService.setSessionStorageData()

    let reqObj = {
      ZoneId: this.commonService.sessionStorageData.zoneAccessArea === null ||
        this.commonService.sessionStorageData.zoneAccessArea.length === 0 ? [] :
        (this.commonService.sessionStorageData.zoneAccessArea).split(',')
    }
    this.storeTradeService.getZoneDetailsById(reqObj).subscribe((res: any) => {
      this.zoneList = res.zoneModels
      console.log("ZONE DETAILS RES ===>", this.zoneList)
    })
  }

  updateStatus(event: any, zoneId: any) {
    const updatedZoneList = [...this.zoneList];
    const zoneIndex = updatedZoneList.findIndex((zone) => zone.ZoneId === zoneId);
    if (zoneIndex !== -1) {
      // Update the status of the zone in the local data
      updatedZoneList[zoneIndex].Status = event.checked ? '1' : '0';

      // Update the local data without making an API call
      this.zoneList = updatedZoneList;
      let reqObj = {
        ZoneId: zoneId,
        Status: event.checked ? '1' : '0'
      };

      this.storeTradeService.updateZoneActivation(reqObj).subscribe((res: any) => {
        console.log("ZONE UPDATE ZONE ACTIVATION ===>", res);

        if (res.success) {
          this.userCreated("Zone updated successfully");
        }
      });
    }
  }




  getToasterStatus() {
    this.commonService.userPopup.subscribe((value: any) => {
      this.toasterStatus = value.status
    })
  }

  userCreated(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
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
          this.userData = JSON.parse(sessionStorage.getItem('userData') || '');
          this.zoneAreaListCount = this.userData.zoneAccessArea.split(",").length > 0 ? this.userData.zoneAccessArea.split(",").length - 1 : ""
          this.getZoneDetails();
        }
    })

  }

  toggleData() {
    if (this.showLoadMore) {
      const newItemsToShow = this.zoneList.length;
      if (newItemsToShow >= this.zoneList.length) {
        this.showLoadMore = false;
      }
      this.itemsToShow = newItemsToShow;
    } else {
      this.itemsToShow = 3;
      this.showLoadMore = true;
    }
  }
}
