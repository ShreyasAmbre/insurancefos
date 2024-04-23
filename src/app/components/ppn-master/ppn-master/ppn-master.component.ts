import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { ChangeDetectorRef } from '@angular/core';
import { PpnmasterService } from '../../../services/ppnmaster/ppnmaster.service';
import { MessageService } from 'primeng/api';
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { PPNSubModuleAccess } from '../../../models/PPNMaster/ppnmasterInterface'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectAreaComponent } from '../../../common/select-area/select-area.component';
import { StoretradeService } from '../../../services/storetrade/storetrade.service';
import { AssetService } from '../../../services/assetmanagement/asset.service';
import { LoaderService } from '../../../services/loader/loader.service';



@Component({
  selector: 'app-ppn-master',
  templateUrl: './ppn-master.component.html',
  styleUrls: ['./ppn-master.component.scss'],
  providers: [DialogService]

})
export class PpnMasterComponent implements OnInit {
  isEditPopUp : boolean = true
  //ppnListOG: any = [];
  ppnRecords: any[] = [];
  isDisable: boolean[] = Array(this.ppnRecords.length).fill(false);
  displayaccBody: boolean = false;
  accBody: boolean = false;
  accHead: boolean = false;
  isOpen: boolean = false;
  indexval: any;
  buttonLabel: any;
  ppnHeader: any;
  openDeletePopUp: boolean = false;
  currentlyEditedUserIndex: number = -1;
  currentlyOpenPopup: number = -1
  searchText: String = '';
  searchForm: FormGroup = new FormGroup([]);
  ppnDetails: any = {}
  num: any;
  ppnData: any = {};
  isVisible: any;
  ppnCreation: FormGroup = new FormGroup({});
  ppnDetailsFromParent: any = []
  userid = '';
  toasterStatus: boolean = false
  PPNSubRoleAccess: PPNSubModuleAccess = {
    PPNDisable: "0",
    PPNEdit: "0",
    PPNCreate: "0",
    PPNList: "0",
  }
  selectAccessDialogRef: DynamicDialogRef | undefined;
  zoneIds = []
  zoneList: any = []
  fromSelectAccess: any;
  primaryZoneId: any;
  assetCreation: any;
  userGrid: any[] = [];
  userGridOG: any[] = [];
  isDescending: boolean = true

  rowsPerPage: number = 10;
  currentPage: number = 0;
  userData: any;
  zoneAreaListCount: any;
  userRole: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private storeTradeService: StoretradeService,
    private service: PpnmasterService,
    private messageService: MessageService,
    private commonService: CommonmasterService,
    public dialogService: DialogService,
    private services: AssetService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    let data: any = sessionStorage.getItem('userData');
    var prData = JSON.parse(data);
    this.userid = prData.userId;
    this.getPPNMasterList();
    this.searchFormBuilder();
    console.log(this.buttonLabel);
    this.getToasterStatus();
    this.getAccessFlags();
    this.userData = JSON.parse(sessionStorage.getItem('userData') || '');
    this.zoneAreaListCount = this.userData.zoneAccessArea.split(",").length > 0 ? this.userData.zoneAccessArea.split(",").length - 1 : ""
    this.userRole = this.commonService.sessionStorageData.roleId
    //this.getZoneDetails();
  }

  closeCreatePPN(data:boolean){
    this.isOpen = data;
  }
  searchFormBuilder() {
    this.searchForm = this.formBuilder.group({
      searchInput: new FormControl("", ValidationConstants.nameValidation),
    });
  }
 
  showppnForm(click: number, index?: number, ppnobj?: any) {
    if (this.PPNSubRoleAccess?.PPNCreate !== '2') {
      this.indexval = index;
      if (click === 1) {
        this.isOpen = true;
        console.log(this.isOpen)
        this.currentlyEditedUserIndex = this.ppnRecords.length - 1;
        this.ppnDetailsFromParent = '';
        this.buttonLabel = 'Create';
        this.ppnHeader = 'PPN Master';
        this.isEditPopUp = false;
      } else if (click === 2) {
        this.getPPNDetailsById(ppnobj.PPNId)
      }
    }
    
  }
  searchBYText(data:any) {
    console.log(data);
    this.searchText = data
  }
    closePopUp() {
    this.isOpen = false;
    this.openDeletePopUp = false;
    this.accHead = false;
    this.displayaccBody = false;
  }
  getPPNMasterList() {
    this.loaderService.loadingSub.next(true)
    this.commonService.setSessionStorageData()
    let reqObj = {
      //ZoneId: this.commonService.getterSessionZoneIds()
      ZoneId: this.commonService.sessionStorageData.zoneAccessArea === null ||
        this.commonService.sessionStorageData.zoneAccessArea.length === 0 ? [] :
        (this.commonService.sessionStorageData.zoneAccessArea).split(',')
    }
    this.service.GetPPNMasterList(reqObj).subscribe({
      next: (data: any) => {
        this.loaderService.loadingSub.next(false)
        console.log(data);
        this.ppnRecords = data.ppnlist
        //this.ppnListOG = data.ppnlist;
        //this.ppnRecords = this.ppnListOG.slice(0, 5);
        console.log(data.Is_Visible);
        for (let i = 0; i < this.ppnRecords.length; i++) {
          console.log(this.ppnRecords[i]['Is_Visible']);
          if (this.ppnRecords[i]['Is_Visible'] == '0') {
            this.isDisable[i] = true;
          } else {
            this.isDisable[i] = false;
          }
        }
      },
      error: (err: any) => {
        this.loaderService.loadingSub.next(false)
        console.log(err);
      }
    });
  } 
  getPPNList(data: any) {
    this.getPPNMasterList();
    console.log('Received Data in Parent:', data);
  }

  showAccordianBody(index: number) {
    console.log(index);
    if (this.currentlyOpenPopup === index) {
      this.currentlyOpenPopup = -1;
      this.displayaccBody = false;
    } else {
      this.currentlyOpenPopup = index;
      this.displayaccBody = true;
    }
    this.accBody = this.displayaccBody;
    this.accHead = this.displayaccBody;
  }
  opendeletePPN(index: number, object: any) {
    this.openDeletePopUp = true;
    this.num = index;
    this.ppnData = object;
  }
  deleteGrid(gridindex: number) {
    this.num = gridindex;
    this.accHead = false;
    this.displayaccBody = false;
    console.log(this.ppnData)
    /*this.ppnData.Is_Visible = '1'*/
    this.service.getDetailsByppnId(this.ppnData.PPNId).subscribe({
      next: (data: any) => {
        this.deletePPN(data, gridindex)
      }
    })

    this.openDeletePopUp = false;
  }
  deletePPN(data: any, gridindex: number) {
    this.num = gridindex
    this.service.DeletePPNmaster(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.ppnRecords.splice(gridindex, 1);
        this.deletetoaster()
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  deletetoaster() {
    this.messageService.add({
      severity: 'success',
      summary: '',
      detail: 'User deleted Successfully',
      sticky: true
    });
  }
 
  onDisable(i: number, object: any) {
    if (this.PPNSubRoleAccess?.PPNDisable !== '2') {
      this.isDisable[i] = !this.isDisable[i];
      const isVisibleValue = this.isDisable[i] ? '0' : '1';
      const localPpnData = {
        "PPNId": String(object.PPNId),
        "SapVendorCode": object.SapVendorCode,
        "IsVisible": object.IsVisible === '0' ? "1" : "0", // 1-Enable, 0-Disable
        "ModifiedBy": this.userid
      }
      console.log("Clicked Pop up", object.IsVisible);
      this.service.DisableEnablePPN(localPpnData).subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.success) {
            this.getPPNMasterList();
            this.ppnDisable(object.IsVisible == 1 ? 'PPN is Disabled' : 'PPN is Enabled');
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
    
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
    return this.ppnRecords.filter((record: any) => {
      if (record.GarageName) {
        return record.GarageName.toLowerCase().includes(this.searchText.toLowerCase())
      }
    }
    );
  }




  getPPNDetailsById(id:any) {
    this.service.getDetailsByppnId(id).subscribe({
      next: (data: any) => {
        this.ppnDetailsFromParent = data
        this.isOpen = true;

        console.log("DATA BY ID ===>", data)
        this.buttonLabel = 'Submit';
        this.ppnHeader = 'Edit PPN';
        this.isEditPopUp = true;
      }
    })
  }

  getToasterStatus() {
    this.commonService.userPopup.subscribe((value: any) => {
      this.toasterStatus = value.status
    })
  }

  getZoneDetails() {
    let data: any = sessionStorage.getItem('userData');
    let reqObj = {
      ZoneId: this.zoneIds
    }
    this.storeTradeService.getZoneDetailsById(reqObj).subscribe((res: any) => {
      this.zoneList = res.zoneModels
      console.log("ZONE DETAILS RES ===>", this.zoneList)
    })
  }

  ppnDisable(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
  }
  getAssetList() {
    this.commonService.setSessionStorageData()
    let reqObj = {
      //ZoneId: this.commonService.getterSessionZoneIds()
      ZoneId: this.commonService.sessionStorageData.zoneAccessArea === null ? [] :
        (this.commonService.sessionStorageData.zoneAccessArea).split(',')
    }
    this.services.GetAssetList(reqObj).subscribe({
      next: (data: any) => {
        //console.log('Assets List Data  ===>', data);
        this.userGrid = data.assetList;
        this.userGridOG = data.assetList;
        this.userGrid = this.userGridOG.slice(0, 5);
      },
      error: (error: any) => {
        console.log(error);
      },
    });

  }

  getAccessFlags() {
    this.commonService.roleAccessObj.subscribe((data: any) => {
      this.PPNSubRoleAccess = data?.PPNMaster?.SubRoleAccess
      console.log("ACCESS DATA ===>", this.PPNSubRoleAccess?.PPNList)
    })
  }
  showToaster(msg: string) {
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
        this.getPPNMasterList()
        this.showToaster("Access Area Updated Successfully")
      }
      //this.fromSelectAccess = data.value
      //this.primaryZoneId = data.value.zoneId
    })

  }

  sortPPNData() {
    this.isDescending = !this.isDescending;
    if (this.isDescending) {
      const descendingOrderByName = this.ppnRecords.slice().sort((a, b) => a.City && b.City ? b.City.localeCompare(a.City) : 0);
      this.ppnRecords = descendingOrderByName
      //this.ppnListOG = descendingOrderByName
      //this.ppnRecords = this.ppnListOG.slice(0, 5);
    } else {
      const ascendingOrderByName = this.ppnRecords.slice().sort((a, b) => a.City && b.City ? a.City.localeCompare(b.City) : 0);
      this.ppnRecords = ascendingOrderByName
      //this.ppnListOG = ascendingOrderByName
      //this.ppnRecords = this.ppnListOG.slice(0, 5);
    }
  }

  onSearch() {
    this.currentPage = 0;
  }
}

