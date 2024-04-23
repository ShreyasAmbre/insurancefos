import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonmasterService } from '../../services/common/commonmaster.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  displaySideNav: boolean = false;
  displaySideStickyMenu: boolean = false;
  displaySubMenu = 'none';
  userRoleAccessObj: any;
  toasterIsSuccess: boolean = true
  toasterStatus: boolean = false

  constructor(private commonService: CommonmasterService) {
    this.getToasterStatus()
  }

  ngOnInit() {
    this.getAccessRoleStatus()
    this.commonService.setSessionStorageData()
  }
  showSideNav() {
    this.displaySideNav = true;
    this.displaySideStickyMenu = true
  }
  hideSideNav() {
    this.displaySideNav = false;
    this.displaySideStickyMenu = false
  }

  hideSubMenu() {
    this.displaySubMenu = 'none'
  }


  showSubMenu() {
    this.displaySubMenu = 'block';
  //  console.log('clicked')
  }

  logoutUser() {
    this.commonService.userLogout()
  }


  getAccessRoleStatus() {
    this.commonService.roleAccessObj.subscribe((data:any) => {
      if (data !== null) {
        console.log("ENCDEC data ===>", data, data === null)
        this.userRoleAccessObj = data
      } else {
        this.commonService.decryptAndSetRoleAccessSubject()
      }
    })
  }

  getToasterStatus() {
    this.commonService.userPopup.subscribe((value: any) => {
      this.toasterStatus = value.status
      this.toasterIsSuccess = value.isSuccess
      if (value.status) {
        setTimeout(() => {
          this.commonService.userPopup.next({ status: false, toastMsg: '', isSuccess: true });
        }, 2000);
      }
    })
  }


}
