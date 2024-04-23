import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { AssetService } from '../../../services/assetmanagement/asset.service';
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectAreaComponent } from '../../../common/select-area/select-area.component';
import { trigger } from '@angular/animations';
import { LoaderService } from '../../../services/loader/loader.service';


@Component({
  selector: 'app-assets-management-home',
  templateUrl: './assets-management-home.component.html',
  styleUrls: ['./assets-management-home.component.scss'],
  providers: [DialogService]
})
export class AssetsManagementHomeComponent {
  riderDetails: any = [] ;
  isOpen: boolean = false
  currentlyEditedUserIndex: number = -1;
  searchText: String = '';
  displayaccBody: boolean = false;
  accHead: boolean = false;
  buttonLabel: any;
  assetHeader: any;
  isEditPopupOpen: boolean = false;
  userRecords: any[] = [];
  //userGridOG: any[] = [];
  searchAsset: FormGroup = new FormGroup([]);
  toasterStatus: boolean = false;
  threeDotsIndex: number = -1;
  editThreeOpen: boolean = false;
  selectAccessDialogRef: DynamicDialogRef | undefined;
  openDeletePopUp: boolean = false;
  num: any;
  assetData: any = {}
  assetIndex: any;
;
  assetObj: any
  indexval: any;
  defaultPageSize: number = 10;

  rowsPerPage: number = 10;
  currentPage: number = 0;

  userData: any;
  zoneAreaListCount: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: AssetService,
    private commonService: CommonmasterService,
    public dialogService: DialogService,
    private loaderService: LoaderService
  ) { }
    
  ngOnInit() {
    this.getAssetList()
    this.searchFormBuilder()
    this.getToasterStatus()
    this.userData = JSON.parse(sessionStorage.getItem('userData') || '');
    this.zoneAreaListCount = this.userData.zoneAccessArea.split(",").length > 0 ? this.userData.zoneAccessArea.split(",").length - 1 : ""
  }

  closeCreateAsset(data: boolean) {
    this.isOpen = data
  }

  searchFormBuilder() {
    this.searchAsset = this.formBuilder.group({
      searchInput: new FormControl("", ValidationConstants.nameValidation),
    });
  }

  closePopUp() {
    this.openDeletePopUp = false
  }


  openCreateAssest(click: number,assetObj?:any, index?: number, ) {
    this.indexval = index;
    this.isEditPopupOpen = click === 1 ? false : true;
    if (click === 1) {
      this.isOpen = true;
      this.currentlyEditedUserIndex = this.userRecords.length - 1;
      this.buttonLabel = 'Create';
      this.assetHeader = 'Create new rider';
      this.isEditPopupOpen = false;
      this.riderDetails = ''
    } else if (click === 2) {
      this.buttonLabel = 'Submit';
      this.assetHeader = 'Edit Rider';
      this.isEditPopupOpen = true;
      this.indexval = index;
      if (index !== undefined) {
        this.currentlyEditedUserIndex = index;
        //var userToEdit = this.userRecords[this.currentlyEditedUserIndex];
        var userToEdit = this.userRecords[this.currentlyEditedUserIndex];
        if (assetObj) {
          this.service.GetAssetById(assetObj.UserId).subscribe({
            next: (data: any) => {
              this.isOpen = true;
                this.riderDetails = data
            },
            error: (error: any) => {
              console.log(error);
            },
          });
        }
      }
    }
  }

  userCreated(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
  }
  
  opendeleteAsset(object: any) {
    this.openDeletePopUp = true;
    //this.num = index;
    this.assetData = object;
  }

  deleteAsset(data: any, gridindex: number) {
    this.accHead = false;
    this.displayaccBody = false;
    this.openDeletePopUp = false;

    this.num = gridindex
    this.service.DeleteAsset(data).subscribe((data: any) => {
      //console.log(' userToDelete deleteAsset RESPONSE ===>', data);
      if (data.success) {
        this.userCreated("Rider Deleted Successfully")
        this.userRecords.splice(gridindex, 1);
        //this.userGridOG.splice(gridindex, 1);
      }
    });
  }

  onPageChange(event: any) {
    this.rowsPerPage = event.rows
    this.currentPage = event.page;
  }

  get visibleRecords() {
    const startIndex = this.currentPage * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    return this.filteredRecords.slice(startIndex, endIndex);
  }

  get filteredRecords() {
    return this.userRecords.filter(record => {
      if (record.Username) {
        return record.Username.toLowerCase().includes(this.searchText.toLowerCase())
      }
    });
  }


  
  getAssetList() {
    this.loaderService.loadingSub.next(true)
    this.commonService.setSessionStorageData()
    let reqObj = {
      //ZoneId: this.commonService.getterSessionZoneIds()
      ZoneId: this.commonService.sessionStorageData.zoneAccessArea === null ||
        this.commonService.sessionStorageData.zoneAccessArea.length === 0 ? [] :
        (this.commonService.sessionStorageData.zoneAccessArea).split(',')
    }
    this.service.GetAssetList(reqObj).subscribe({
      next: (data: any) => {
        this.loaderService.loadingSub.next(false)
        this.userRecords = data.assetList;
      },
      error: (error: any) => {
        this.loaderService.loadingSub.next(false)
        console.log(error);
      },
    });

  }

  getToasterStatus() {
    this.commonService.userPopup.subscribe((value: any) => {
      this.toasterStatus = value.status
    })
  }

  openSelectAccess() {
    this.selectAccessDialogRef = this.dialogService.open(SelectAreaComponent, {
        data: { },
        header: 'Select access area',
        width: '32%',
        height: 'auto',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
      });

    this.selectAccessDialogRef.onClose.subscribe((data: any) => {
      //console.log("SELECT ACCESS POPUP CLOSE", data)
      if (data.success) {
        this.userData = JSON.parse(sessionStorage.getItem('userData') || '');
        this.zoneAreaListCount = this.userData.zoneAccessArea.split(",").length > 0 ? this.userData.zoneAccessArea.split(",").length - 1 : ""
        this.getAssetList();
        this.userCreated("Access Area Updated Successfully")
      }
    });

  }

  disableAsset() {
    this.openDeletePopUp = false;
    let reqObj =  {
      userid: this.assetData.UserId,
      modifiedby: this.commonService.sessionStorageData.zoneAccessArea.userId,
      enabledisable: this.assetData.IsDisable === '0' ? "1" : "0"		//0-Disable, 1-Enable
    }

    this.service.DisableEnableAsset(reqObj).subscribe((res: any) => {
      //console.log("ENABLE RES ===>", res)
      if (res.success) {
        this.getAssetList()
        this.userCreated(reqObj.enabledisable == '0' ? 'Rider is Disabled' : 'Rider is Enabled');
      }
    })

  }
  editOpen(idx: any, trigger: string) {
    console.log(idx, trigger);
    if (trigger === 'upper' && this.threeDotsIndex === idx) {
      this.threeDotsIndex = -1; // we want to close the pop up
    }
    if (trigger === 'inner') {
      if (this.threeDotsIndex === idx) {
        this.threeDotsIndex = -1; // we want to close the pop up
      } else {
        this.threeDotsIndex = idx; // we want to open the pop up
      }
      
    }
  }

}
