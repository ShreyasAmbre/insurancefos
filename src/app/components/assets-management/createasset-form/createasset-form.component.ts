import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { AssetService } from '../../../services/assetmanagement/asset.service';
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { Accesslevel, SecondAccessLevel, AccessList, CityList } from 'src/app/models/AssetManagement/assetInterface';
import { SelectItem } from 'primeng/api';
import { SelectPrimaryAccessComponent } from '../select-primary-access/select-primary-access.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-createasset-form',
  templateUrl: './createasset-form.component.html',
  styleUrls: ['./createasset-form.component.scss'],
  providers: [DialogService]
})
export class CreateassetFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  displayPopUp = "block";
  secondaryAccList: AccessList[] = [];
  @Input() riderDetails: any ;
  @Output() closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() assetList: EventEmitter<object> = new EventEmitter<object>();
  @Input() assetHeader: string = '';
  @Input() isEditPopupOpen: boolean = false;
  @Input() buttonLabel = '';
  PrimaryAccessLevel: any;
  userDetails: any = [];
  userGrid: any[] = [];
  displayStateList = 'none';
  userid: any;
  hoverState: boolean = false;
  skillSetOptions: SelectItem[] = [
    { label: 'Motor', value: 'Motor' },
    { label: 'Wyn', value: 'Wyn' },
  ];
  AccessLevel: Accesslevel[] = [
    { ZoneId: '1', ZoneName: 'State' },
    { ZoneId: '2', ZoneName: 'City' },
    { ZoneId: '3', ZoneName: 'Zone' },
  ];
  assetCreation: FormGroup  = new FormGroup([]);
  accessList: AccessList[] = [];
  SecondaryAccessOptions: SecondAccessLevel[] = [
    { code: '1', name: 'Zone' },
    { code: '2', name: 'City' },
  ];
  selectedName: any;
  isngSelect: boolean = false;
  StateDropDown: boolean = false;
  cityList: CityList[] = [];
  zoneList: any = [];
  selectPrimaryAccessDialogRef: DynamicDialogRef | undefined;
  fromSelectAccess: any;
  primaryZoneId: any;
  isEmployeeIdExists: boolean = false;
  indexval: any;
  currentlyEditedUserIndex: number = -1
  status: any;
  constructor(private formBuilder: FormBuilder, private service: AssetService, private commonService: CommonmasterService, public dialogService: DialogService) { }

  ngOnInit() {
    this.assetCreationFormBuilder();
    let data: any = sessionStorage.getItem('userData');
    var prData = JSON.parse(data);
    this.userid = prData.userId;
    this.patchValue()
  }
  ngOnChanges(changes: SimpleChanges) {
    this.patchValue()
  }

  ngAfterViewInit(): void {
    if (this.riderDetails) {
      this.assetCreation.patchValue({ SkillSet: this.riderDetails.SkillSet });
    } else {
      this.assetCreation.patchValue({ SkillSet: 'Motor' });
    }
  }

  patchValue() {
    console.log(this.riderDetails)
    if (this.riderDetails) {
      this.riderDetails.PrimaryAccessLevel = `${this.riderDetails.PrimaryStateName}, ${this.riderDetails.PrimaryCityName}, ${this.riderDetails.PrimaryAccessAreaName}` 
      this.riderDetails.SecondaryAccessLevel = `${this.riderDetails.SecondaryStateName}, ${this.riderDetails.SecondaryCityName}, ${this.riderDetails.SecondaryAccessAreaName}`
      this.assetCreation.patchValue(this.riderDetails);
      this.assetCreation.controls['UserId'].disable();
    } else {
      this.assetCreation.reset();
    }
  }

  ngOnDestroy(): void {
    if (this.selectPrimaryAccessDialogRef) {
      this.selectPrimaryAccessDialogRef.close();
    }
  }

  assetCreationFormBuilder() {
    this.assetCreation = this.formBuilder.group({
      Username: ['', ValidationConstants.fullNameValidation],
      MobileNo: ['', ValidationConstants.mobileNoUser],
      UserId: [{ value: '', disabled: this.isEditPopupOpen }, ValidationConstants.userValidations],
      Capacity: ['', ValidationConstants.assetCapacity],
      SkillSet: [''],
      PrimaryAccessLevel: ['', ValidationConstants.requiredValidation],
      PrimaryAccessArea: [''],
      SecondaryAccessLevel: ['',ValidationConstants.requiredValidation],
      SecondaryAccessArea: [''],
      Createdby: this.userid,
      ModifiedBy: '',
    });
  }
  
  closePopUp() {
    this.displayPopUp = 'none';
  }
  
  onSubmit() {
    if (this.userid) {
      this.assetCreation.get('Createdby')?.setValue(this.userid);
    }
    this.displayPopUp = 'none';
    this.userDetails = this.assetCreation.value;
    this.service.CreateAsset(this.userDetails).subscribe({
      next: (data: any) => {
        console.log('Response Data:', data);
        if (data.success == true) {
          this.assetList.emit(this.userDetails)
          this.userCreated('Rider Created Succesfully');
          this.closeEvent.emit(false);
        }
      },
      error: (error: any) => {
        console.log("ERROR", error)
        if (error.status === 409) {
       /*   this.isEmployeeIdExists = true;*/
          this.closeEvent.emit(true);
        }
        console.log(error);
      },
    });
  }
   userCreated(msg: string) {
     this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
  }


  isOptionSelected(option: string): boolean {
    return option === this.PrimaryAccessLevel;
  }

  onClickState() {
    this.StateDropDown = !this.StateDropDown;
  }

  
  onUpdate() {
    this.displayPopUp = 'none';
      var userToEdit = this.assetCreation.value;
    //console.log('FORM DATA ===>', this.assetCreation.value);
      userToEdit.UserId = this.riderDetails.UserId
      userToEdit.PrimaryAccessLevel = userToEdit.PrimaryAccessAreaName
      userToEdit.SecondaryAccessLevel = userToEdit.SecondaryAccessAreaName
      this.service.EditAsset(userToEdit).subscribe({
        next: (data: any) => {
          if (data.success === true) {
            this.userGrid[this.currentlyEditedUserIndex] = userToEdit;
            console.log(userToEdit);
            this.assetList.emit(userToEdit)
            this.userCreated('Rider Edited Successfully');
            this.closeEvent.emit(false);
          }
        },
      });
  }

  openSelectPrimaryAccess(fieldName: string, otherAccessField: string, zoneField: string) {
    if (this.riderDetails) {
      this.selectPrimaryAccessDialogRef = this.dialogService.open(SelectPrimaryAccessComponent, {
        data: {
          fieldName: fieldName, values: this.fromSelectAccess, zoneField: zoneField,
          // I want stateId , StateName, CityId, CityName which is pending from backend
          editPreValues: {
            state: fieldName === "PrimaryAccessLevel" ?
              this.riderDetails?.PrimaryStateName :
              this.riderDetails?.SecondaryStateName,
            stateId: fieldName === "PrimaryAccessLevel" ?
              this.riderDetails?.PrimaryStateId :
              this.riderDetails?.SecondaryStateId,
            city: fieldName === "PrimaryAccessLevel" ?
              this.riderDetails?.PrimaryCityName :
              this.riderDetails?.SecondaryCityName,
            cityId: fieldName === "PrimaryAccessLevel" ?
              this.riderDetails?.PrimaryCityId :
              this.riderDetails?.SecondaryCityId,
            zones: fieldName === "PrimaryAccessLevel" ?
              this.riderDetails?.PrimaryAccessAreaName :
              this.riderDetails?.SecondaryAccessAreaName,
            zoneId: fieldName === "PrimaryAccessLevel" ?
              this.riderDetails?.PrimaryAccessArea :
              this.riderDetails?.SecondaryAccessArea
          },
          fromEdit: true
        },
        header: 'Select access area',
        width: '32%',
        height: 'auto',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
      });
    } else {
      this.selectPrimaryAccessDialogRef = this.dialogService.open(SelectPrimaryAccessComponent, {
        data: { fieldName: fieldName, values: this.fromSelectAccess, zoneField: zoneField, fromEdit: false },
        header: 'Select access area',
        width: '32%',
        height: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
      });
    }

    this.selectPrimaryAccessDialogRef.onClose.subscribe((data: any) => {
      //console.log("SELECT PRIMARY ACCESS POPUP CLOSE", data)
        this.fromSelectAccess = data.value
        this.primaryZoneId = data.value.zoneId
        this.assetCreation.controls[data.field].setValue(data.value.state + ',' + data.value.city + ',' + data.value.zones);
        this.assetCreation.controls[data.zoneField].setValue(data.value.zoneId);
      
    });
    
  }
  onFocus() {
    this.isEmployeeIdExists = false;
  }

  employeeIdCheck(_userId: string) {
    this.service
      .GetAssetById(this.assetCreation.get('UserId')?.value)
      .subscribe(
        {
          next: (data: any) => {
            this.status = data.success;

            if (this.status) {
              this.isEmployeeIdExists = true;
            }
          },
        });
  }
}
