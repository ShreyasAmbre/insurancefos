import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { UserService } from '../../../services/usermanagement/user.service';
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { LoaderService } from '../../../services/loader/loader.service';



@Component({
  selector: 'app-user-management-home',
  templateUrl: './user-management-home.component.html',
  styleUrls: ['./user-management-home.component.scss'],
})
export class UserManagementHomeComponent {
  userDetails: any;
  isOpen: boolean = false;
  click: any;
  showToolTip: boolean = false;
  currentlyEditedUserIndex: number = -1;
  isdeletePopUP: boolean = false;
  num: any;
  UserData: any = [];
  buttonLabel: any = {};
  userRecords: any[] = [];
  //mergeDataOG:any[] = []
  indexval: any;
  searchText: string = '';
  createuserHeader: any;
  currentlyOpenPopup: number = -1;
  isEditPopupOpen: boolean = false
  userSearchForm: FormGroup = new FormGroup([]);
  userList: any;
  toasterStatus: boolean = false
  assetData: any = {}
  threeDotsIndex: number = -1;
  defaultPageSize: number = 10;
  userIndex: any;

  rowsPerPage: number = 10;
  currentPage: number = 0;

  constructor(private formBuilder: FormBuilder, private services: UserService, private commonService: CommonmasterService, private loaderService: LoaderService) { }


  ngOnInit(): void {
    this.getUserList();
    this.searchFormBuilder();
    this.getToasterStatus();
  }

  closeCreateUser(data: boolean) {
    this.isOpen = data;
  }

  closepopUp() {
    this.isdeletePopUP = false;
  }

  searchFormBuilder() {
    this.userSearchForm = this.formBuilder.group({
      searchInput: ["", ValidationConstants.nameValidation],
    });
  }

  createUser(clicks: number, obj?: number) {
    this.isOpen = true
    this.click = clicks
    //this.indexval = index;
    if (clicks === 1) {
      this.currentlyEditedUserIndex = this.UserData.length - 1;
      this.userDetails = null;
      this.buttonLabel = 'Create';
      this.createuserHeader = 'Add new user';
      this.isEditPopupOpen = false
    } else if (clicks === 2) {
      //this.indexval = index;
      this.buttonLabel = 'Submit';
      this.createuserHeader = 'Edit user';
      this.isEditPopupOpen = true
      if (obj) {
        //this.currentlyEditedUserIndex = index;
        var userToEdit = obj;
        if (userToEdit) {
          this.userDetails = userToEdit;
        }
      }
    }
  }


  opendeleteuser( object: any) {
    this.isdeletePopUP = true;
    this.userList = object;
  }

  deleteUser(gridindex: number) {
    this.isdeletePopUP = false;
    let reqObj = {
      UserId: this.userList.UserId,
      modifiedby : this.commonService.sessionStorageData.userId
    };
    this.services.DeleteUser(reqObj).subscribe({
      next: (data: any) => {
        if (data.success) {
          this.userRecords.splice(gridindex, 1)
          //this.mergeDataOG.splice(gridindex,1)
          this.userCreated("User Deleted Successfully")
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    })

  }

  ToggleEditUser(index: number, event: Event, source: string) {
    if (this.currentlyOpenPopup === -1) {
      this.currentlyOpenPopup = index;
      if (!this.showToolTip && source !== "O") {
        this.showToolTip = !this.showToolTip
      }
    } else if (this.currentlyOpenPopup === index) {
      this.currentlyOpenPopup = -1;
      this.showToolTip = !this.showToolTip
    }else {
      this.currentlyOpenPopup = index;
    }
    event.stopPropagation();
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
        if (record.UserName) {
          return record.UserName.toLowerCase().includes(this.searchText.toLowerCase())
        }
      }
    );
  }

  getUserList() {
    this.loaderService.loadingSub.next(true)
    this.services
      .getUserDetails()
      .subscribe((data: any) => {
        this.loaderService.loadingSub.next(false)
        this.userRecords = data.userList;
      }, (err: any) => {
        this.loaderService.loadingSub.next(false)
      })
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



  disableUser() {
    console.log("+++++++", this.userList)
    this.isdeletePopUP = false;
    let reqObj = {
      UserId: this.userList.UserId,
      ModifiedBy: this.commonService.sessionStorageData.zoneAccessArea.userId,
      EnableDisable: this.userList.IsActive === '0' ? "1" : "0"		//0-Disable, 1-Enable
    }

    this.services.DisableEnableUser(reqObj).subscribe((res: any) => {
      //console.log("ENABLE RES ===>", res)
      if (res.success) {
        this.getUserList();
        this.userCreated(reqObj.EnableDisable == '0' ? 'User is Disabled' : 'User is Enabled');
      }
    })

  }

  editOpen(idx: any, trigger: string) {
    //console.log(idx, trigger);
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

  onSearch(){
    this.currentPage = 0;
  }
}
