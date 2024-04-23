import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/usermanagement/user.service';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { LoaderService } from '../../../services/loader/loader.service';
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { RoleList } from '../../../models/UserManagement/usermanagementInterface';
@Component({
  selector: 'app-createuser-form',
  templateUrl: './createuser-form.component.html',
  styleUrls: ['./createuser-form.component.scss']
})
export class CreateuserFormComponent implements OnInit {
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;
  @Output() userList: EventEmitter<object> = new EventEmitter<object>();
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updateList: EventEmitter<object> = new EventEmitter<object>();
  @Output() error: EventEmitter<object> = new EventEmitter<object>();
  @Output() userCreateNew: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() userDetails: any;
  @Input() createuserHeader: string = '';
  @Input() isEditPopupOpen: boolean = false;
  @Input() click: any;
  @Input() buttonLabel = '';
  deletePopUP = 'none';
  accessRoleName: RoleList[] = [];
  AccessRole: any
  isPOpupActive: boolean = true;
  displayPopUp = 'none';
  newDetails: any[] = [];
  status: any;
  roleEvent: any;
  userCreationForm!: FormGroup;
  isUniqueIdExists: boolean = false;
  toasterStatus: boolean = false;

  constructor(private formBuilder: FormBuilder, private services: UserService, private loaderService: LoaderService, private commonService: CommonmasterService) { }

  ngOnInit() {
    this.getAssignRole();
    this.getUserCreationForm();
    this.patchValue();
  }

  getUserCreationForm() {
    this.userCreationForm = this.formBuilder.group({
      UserName: ['', ValidationConstants.fullNameValidation],
      Email: ['', ValidationConstants.userEmailValidations],
      MobileNo: ['', ValidationConstants.mobileNoUser],
      UserId: [{ value: '', disabled: this.isEditPopupOpen ? true : false }, ValidationConstants.userValidations],
      //RoleName: [null, ValidationConstants.requiredValidation],
      RoleId: [null, ValidationConstants.requiredValidation],
      Createdby: [''],
      ModifiedBy: [''],
    });
  }

  patchValue() {
    if (this.userDetails !== undefined && this.userDetails !== null) {
      this.userCreationForm.patchValue(this.userDetails);
      setTimeout(() => {
        this.inputFields.forEach(inputField => {
          if (inputField.nativeElement.id != 'login-userId') {
            inputField.nativeElement.focus();
          } else {
            inputField.nativeElement.focus();
            inputField.nativeElement.disabled = true
          }
        });
      }, 500)
    } else {
      this.userCreationForm.reset();
    }
  }

  closepopUp() {
    this.displayPopUp = 'none';
    this.deletePopUP = 'none';
    this.isPOpupActive = false
  }

  updateRoleId(event: any) {
    this.roleEvent = event;
    const selectedRoleId = event.value.RoleId;
    const selectedRoleName = event.value.RoleName;
    this.userCreationForm.get('RoleId')?.setValue(selectedRoleId);
    this.userCreationForm.get('RoleName')?.setValue(selectedRoleName);
  }

  onSubmit() {
    this.loaderService.loadingSub.next(true);
    this.userCreationForm.get('Createdby')?.setValue(this.commonService.sessionStorageData.userId);
    this.newDetails = this.userCreationForm.value;
    this.services.userCreation(this.newDetails).subscribe({
      next: (data: any) => {
        this.status = data.success;
        if (this.status == true) {
          this.userList.emit(this.newDetails)
          this.closeEvent.emit(false);
          this.userCreated("User Created SuccessFully")
        } else {
          console.log('Oops something went wrong !!', this.status);
        }
        this.loaderService.loadingSub.next(false);
        this.displayPopUp = 'none';
        this.userCreationForm.reset();
      },

      error: (error: any) => {
        this.loaderService.loadingSub.next(false);
        this.error.emit(error)
        console.log("ERROR", error)
        if (error.status === 409) {
          /* this.closeEvent.emit(false);*/
        /*  this.isUniqueIdExists = true;*/
          /*this.alreadyExist();*/

        }
      },
    });
  }


  uniqueIdCheck() {
    let uniqueUserID = (this.userCreationForm.get('UserId')?.value).trim()
    this.userCreationForm.patchValue({ UserId: uniqueUserID }) // To save value without space in form to create user
    this.services
      .GetUserById(uniqueUserID)
      .subscribe(
        {
          next: (data: any) => {
            this.status = data.success;
         
            if (this.status) {
              this.isUniqueIdExists = true;
            }   
          },
        } );
  }
 
  onUpdate() {
    this.userCreationForm.get('ModifiedBy')?.setValue(this.commonService.sessionStorageData.userId);
    var data = {
      UserName: this.userCreationForm.controls['UserName'].value,
      Email: this.userCreationForm.controls['Email'].value,
      MobileNo: this.userCreationForm.controls['MobileNo'].value,
      UserId: this.userCreationForm.controls['UserId'].value,
      RoleId: this.userCreationForm.controls['RoleId'].value,
      ModifiedBy: this.userCreationForm.controls['ModifiedBy'].value,
    }
    var userData = this.userCreationForm.value;
    this.services.EditUser(data).subscribe({
      next: (data: any) => {
        this.status = data.success;
        if (this.status == true) {
          this.updateList.emit(userData)
          this.closeEvent.emit(false);
          this.userCreated("User Edited SuccessFully")
        }
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  userCreated(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true  });
    }, 5000);
  }

  getAssignRole() {
    this.services.getAssignRole().subscribe({
      next: (res: any) => {
        //this.accessRoleName = res
        //console.log('user Response',res)
        //this.accessRoleName = res.map((item: any) => item.RoleId);

        this.accessRoleName = res.map((item: any) => ({ label: item.RoleName, value: item.RoleId }));
        console.log('accessRoleName array:', this.accessRoleName);
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  onFocus() {
    this.isUniqueIdExists = false;
  }
}
