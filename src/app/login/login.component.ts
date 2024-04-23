import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utility } from 'src/app/constants/utility';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { LoaderService } from '../services/loader/loader.service';
import { MessageService } from 'primeng/api';
import { CommonmasterService } from '../services/common/commonmaster.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userName: string = ""
  form: FormGroup = new FormGroup({})
  loginErrorMessage: boolean = false;
  toasterStatus: boolean = false
  subscription$: Subscription = new Subscription;
  toasterIsSuccess: boolean = true


  constructor(private formbuilder: FormBuilder, private router: Router,
    private services: AuthService,
    private loaderService: LoaderService,
    private commonService: CommonmasterService) {
  }

  ngOnInit(): void {
    this.loginFormBuilder()
    this.getToasterStatus()
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  loginFormBuilder() {
    this.form = this.formbuilder.group(
      {
        userId: ["", ValidationConstants.userValidations],
        userPassword: ['', ValidationConstants.requiredValidation],
        rememberMe: [false]
      }
    )
  }


  userLogin() {
    //this.router.navigate(['./dashboard'])
    this.loaderService.loadingSub.next(true)
    let reqObj = {
      "Login": this.form.controls['userId'].value,
      "Password": Utility.encryptionWithoutSalt(this.form.controls['userPassword'].value).toString(),
      "LoginType": "App"
      //"LoginType": this.form.controls['rememberMe'].value
    }
    this.services.userCredentials(reqObj).subscribe({
      next: (res: any) => {


        if (res.success) {
          let userData = {
            userId: this.form.controls['userId'].value,
            userName: Utility.decryptionResponse(res.userName),
            corelationId: res.CorelationId,
            city:res.City,
            //zoneAccessArea: res.ZoneAccessArea,
            zoneAccessArea: Utility.decryptionResponse(res.ZoneAccessArea),
            lastLogin: res.lastLogin,
            //roleId: res.RoleId,
            roleId: Utility.decryptionResponse(res.RoleId),
            roleAccessData: Utility.roleAccessDataEncryption(JSON.stringify(res.AccessRole)),
            isLoggedIn: true,
            authToken: res.AuthToken,
            expiry: res.TokenExpiry
          }
          console.log("ENCDEC data ===>", userData)
          sessionStorage.setItem('userData', JSON.stringify(userData))
          this.commonService.setSessionStorageData()
          this.commonService.loggedInUserId.next(userData.userId)
          this.router.navigate(['./dashboard'])
        } else {
          console.log('User not valid', res);
        }
        this.loaderService.loadingSub.next(false)


      },
      error: (error: any) => {
        this.loaderService.loadingSub.next(false)
        console.log("Login error", error);
        this.loginErrorMessage = true;
      }
    })


  }

  onFocus() {
    this.loginErrorMessage = false;
  }

  getToasterStatus() {
    this.subscription$.add(
      this.commonService.userPopup.subscribe((value: any) => {
        this.toasterStatus = value.status
        this.toasterIsSuccess = value.isSuccess
        if (value.status) {
          setTimeout(() => {
            this.commonService.userPopup.next({ status: false, toastMsg: '', isSuccess: true });
          }, 2000);
        }
      })
    )
  }
}
