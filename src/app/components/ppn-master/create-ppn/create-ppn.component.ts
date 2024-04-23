import { Component, Input, OnInit ,OnChanges, SimpleChanges ,ChangeDetectionStrategy,  EventEmitter, Output, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { PpnmasterService } from '../../../services/ppnmaster/ppnmaster.service';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectAccessAreaComponent } from '../select-access-area/select-access-area.component';
import { CommonmasterService } from '../../../services/common/commonmaster.service';




@Component({
  selector: 'app-create-ppn',
  templateUrl: './create-ppn.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./create-ppn.component.scss'],
  providers: [DialogService]

})
export class CreatePPNComponent implements OnInit{
  @Output() dataEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() buttonLabel: any;
  @Input() isEditPopUp: boolean = false
  @Input() ppnHeader :any;
  @Input() ppnDetailsFromParent: any;
  @Output() updateList: EventEmitter<object> = new EventEmitter<object>();
    @Output() ppnList: EventEmitter<object> = new EventEmitter<object>();
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;
  @Input() isEditPopupOpen: boolean = false;
  userid: any;
  ppnCreation:FormGroup = new FormGroup({});
  ppnDetails: any = {};
  isValid: boolean = false;
  garageTypes: any = [];
  ppnCat: any[] = [];
  ppnListOG: any = [];
  isActiveOverlay: boolean = false;
  selectPrimaryAccessDialogRef: DynamicDialogRef | undefined;
  ppnIdExists: boolean = false;

  constructor(private service: PpnmasterService, private formBuilder: FormBuilder, public dialogService: DialogService, private commonService: CommonmasterService) { }
    
  ngOnInit() {
    console.log("DATA ===>", this.ppnDetailsFromParent)
    let data: any = sessionStorage.getItem('userData');
    var prData = JSON.parse(data);
    this.userid = prData.userId;

    this.getPPNForm();
    this.getPPNcategory();
    this.getGarageType();
    if (this.ppnDetailsFromParent) {
      this.setFormValues()
    }
  }
  getPPNForm() {
    //FormBinding
    this.ppnCreation = this.formBuilder.group({
      GarageType: ['', ValidationConstants.requiredValidation],
      PPNCategory: ['', ValidationConstants.requiredValidation],
      SapVendorCode: ['', ValidationConstants.onlyNum8to10],
      ServiceCapability: ['', ValidationConstants.aplhaNumericUpto24CharOptional],
      NetworkPriority: ['', ValidationConstants.aplhaNumericUpto24CharOptional],
      CapacityOfVehical: ['', ValidationConstants.aplhaNumericUpto24CharOptional],
      EscalationLevel: ['', ValidationConstants.nameValidation],
      MobileNo: ['', ValidationConstants.mobileNoUser],
      Hub: [''],
      PPNContactNo: ['', ValidationConstants.ppnContactNumber],
      PPNLat: ['', ValidationConstants.latitudeValidaiton],
      //PPNLat: ['', ValidationConstants.requiredValidation],
      PPNLong: ['', ValidationConstants.longitudeValidaiton],
      //PPNLong: ['', ValidationConstants.requiredValidation],
      ProductName: [''],
      Manufacturer: [''],
      GarageName: ['', ValidationConstants.onlyAlpha5to50Char],
      Pincode: ['', ValidationConstants.ppnPinCodeValidation],
      Address: ['', ValidationConstants.ppnAddressValidation],
      StartTime: ['', ValidationConstants.requiredValidation, this.startTimeRangeValidator()],
  /*    StartTime: ['', ValidationConstants.requiredValidation],*/
      EndTime: ['', ValidationConstants.requiredValidation, this.timeRangeValidator()],
   /*   EndTime: ['', ValidationConstants.requiredValidation],*/
      State: ['', ValidationConstants.PPNstate],
      City: ['', ValidationConstants.PPNcity],
      GeoVertical: ['', ValidationConstants.aplhaNumericUpto24CharOptional],
      AccessAreaName: ['', ValidationConstants.requiredValidation],
      AccessArea: ['', ValidationConstants.requiredValidation],
      CreatedBy: [''],
      ModifiedBy: [''],
    });
  }

  addUser(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
  }
  onSubmit() {
    console.log("FORM VALUE ===>", this.ppnCreation.value)
    this.ppnCreation.get('CreatedBy')?.setValue(this.userid);
    //this.ppnCreation.get('State')?.setValue('Maha');
    //this.ppnCreation.get('PPNId')?.setValue('0');

    console.log("PPN FORM ==>", this.ppnCreation)
    this.ppnDetails = this.ppnCreation.value;
    if (this.ppnCreation.valid) {
      this.isValid = false;
      this.service.CreatePPNMaster(this.ppnDetails).subscribe({
        next: (data: any) => {
          console.log(typeof data);
          if (data.success === true) {
            this.ppnList.emit(data);
            this.dataEvent.emit(false);
            this.addUser('PPN Created Successfully');
          }
        },
        error: (err: any) => {
          console.log(err);
          this.ppnIdExists = true;
        }
      });
    } else {
      this.isValid = true;
    };
   
  }
  getPPNcategory() {
    this.commonService.getPPNcategory().subscribe({
      next: (data: any[]) => {
        this.ppnCat = data.map((item: any) => item.ppnCategory);
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  getGarageType() {
    this.commonService.getGarageType().subscribe({
      next: (data: any[]) => {
        this.garageTypes = data.map((item: any) => item.GarageType);
      },
      error: (err: any) => {
        console.log(err)
      }
    });
  }

  updateUser(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
  }
  onUpdate() {
      console.log(this.ppnList)
      this.ppnCreation.get('ModifiedBy')?.setValue(this.userid);
      var ppnData = this.ppnCreation.value;
      if (this.ppnDetailsFromParent) {
        ppnData["PPNId"] = String(this.ppnDetailsFromParent.PPNId) 
        ppnData["PreSapVendorCode"] = this.ppnDetailsFromParent.SapVendorCode
      }
    this.service.EditPPNmaster(ppnData).subscribe({
      next: (data: any) => {
        if (data.success) {
            let reqObj = {
              ZoneId: this.commonService.getterSessionZoneIds()
            }
            this.service.GetPPNMasterList(reqObj).subscribe((data: any) => {
              this.ppnList.emit(data);
            this.dataEvent.emit(false);
              this.updateUser('PPN Successfully Updated');
          });
        } else {
          console.error('Error during PPN update:');
          this.ppnIdExists = true;
        }
        
      },
      error: (err: any) => {
        
      }
    });
  }

  openAccessSelect() {
    this.selectPrimaryAccessDialogRef = this.dialogService.open(SelectAccessAreaComponent, {
      data: {
        editPreValues: {
          state: this.ppnDetailsFromParent.StateName,
          stateId: this.ppnDetailsFromParent.StateId,
          city: this.ppnDetailsFromParent.CityName,
          cityId: this.ppnDetailsFromParent.CityId,
          zones: this.ppnDetailsFromParent.AccessAreaName,
          zoneId: this.ppnDetailsFromParent.AccessArea
        },
        fromEdit: this.ppnDetailsFromParent ? true : false 
      },
      header: 'Select access area',
      width: '32%',
      height: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.selectPrimaryAccessDialogRef.onClose.subscribe((data: any) => {
      console.log("SELECT PRIMARY ACCESS POPUP CLOSE", data)
      if (data) {
        this.ppnCreation.controls["AccessAreaName"].setValue(data.value.state + ',' + data.value.city + ',' + data.value.zones);
        this.ppnCreation.controls["AccessArea"].setValue(data.value.zoneId);
      }
      

    });
  }

  setFormValues() {
    this.ppnCreation.setValue({
      "GarageType": this.ppnDetailsFromParent.GarageType,
      "PPNCategory": this.ppnDetailsFromParent.PPNCategory,
      "SapVendorCode": this.ppnDetailsFromParent.SapVendorCode,
      "ServiceCapability": this.ppnDetailsFromParent.ServiceCapability,
      "NetworkPriority": this.ppnDetailsFromParent.NetworkPriority,
      "CapacityOfVehical": this.ppnDetailsFromParent.CapacityOfVehical,
      "EscalationLevel": this.ppnDetailsFromParent.EscalationLevel,
      "MobileNo": this.ppnDetailsFromParent.MobileNo,
      "Hub": this.ppnDetailsFromParent.Hub,
      "PPNContactNo": this.ppnDetailsFromParent.PPNContactNo,
      "PPNLat": this.ppnDetailsFromParent.PPNLat,
      "PPNLong": this.ppnDetailsFromParent.PPNLong,
      "ProductName": this.ppnDetailsFromParent.ProductName,
      "Manufacturer": this.ppnDetailsFromParent.Manufacturer,
      "GarageName": this.ppnDetailsFromParent.GarageName,
      "Pincode": this.ppnDetailsFromParent.Pincode,
      "Address": this.ppnDetailsFromParent.Address,
      "StartTime": this.ppnDetailsFromParent.StartTime,
      "EndTime": this.ppnDetailsFromParent.EndTime,
      "State": this.ppnDetailsFromParent.State,
      "City": this.ppnDetailsFromParent.City,
      "GeoVertical": this.ppnDetailsFromParent.GeoVertical,
      "AccessAreaName": `${this.ppnDetailsFromParent.StateName}, ${this.ppnDetailsFromParent.CityName}, ${this.ppnDetailsFromParent.AccessAreaName}`,
      "AccessArea": this.ppnDetailsFromParent.AccessArea,
      "CreatedBy": this.userid,
      "ModifiedBy": this.userid 
    });

    console.log("DATA ===>", this.ppnCreation)


    setTimeout(() => {
      this.inputFields.forEach(inputField => {
        inputField.nativeElement.focus();
      });
    }, 500)
  }

  onFocus() {
    this.ppnIdExists = false;
  }

  timeRangeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise(resolve => {
        const timeString = control.value;
        const [time, meridiem] = timeString.split(' ');
        const [hours, minutes, seconds] = time.split(':');

        let hours24 = parseInt(hours, 10);

        if (meridiem === 'PM' && hours24 !== 12) {
          hours24 += 12;
        } else if (meridiem === 'AM' && hours24 === 12) {
          hours24 = 0;
        }

        const selectedTime = new Date();
        selectedTime.setHours(hours24, parseInt(minutes, 10), parseInt(seconds, 10), 0);

        const startTime = new Date();
        const endTime = new Date();

        startTime.setHours(9, 30, 0);  
        endTime.setHours(18, 30, 0);  
        if (selectedTime < startTime || selectedTime > endTime) {
          resolve({ invalidTime: true });
        } else {
          const sTime = this.ppnCreation.get('StartTime')?.value;
          const eTime = this.ppnCreation.get('EndTime')?.value;
          const stimeNew = new Date();
          const [stime, sMeridiem] = sTime.split(' ');
          const [shours, sminutes, sseconds] = stime.split(':');

          let shours24 = parseInt(shours, 10);

          if (sMeridiem === 'PM' && shours24 !== 12) {
            shours24 += 12;
          } else if (sMeridiem === 'AM' && shours24 === 12) {
            shours24 = 0;
          }
          stimeNew.setHours(shours24, parseInt(sminutes, 10), parseInt(sseconds, 10), 0);
          const timeDifference = (selectedTime.getTime() - stimeNew.getTime()) / (1000 * 60);


          if (timeDifference < 30) {
            resolve({ invalidTimeDifference: true });
          } else {
            resolve(null);
          }
        }
      });
    };
  }

  startTimeRangeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise(resolve => {
        const timeString = control.value; // Assuming it's in the format "07:53:38 AM"
        const [time, meridiem] = timeString.split(' ');
        const [hours, minutes, seconds] = time.split(':');

        let hours24 = parseInt(hours, 10);

        // Convert to 24-hour format if in AM/PM format
        if (meridiem === 'PM' && hours24 !== 12) {
          hours24 += 12;
        } else if (meridiem === 'AM' && hours24 === 12) {
          hours24 = 0;
        }

        const selectedTime = new Date();
        selectedTime.setHours(hours24, parseInt(minutes, 10), parseInt(seconds, 10), 0);

        const startTime = new Date();
        const endTime = new Date();

        startTime.setHours(9, 30, 0);  // Set start time to 9:30 AM
        endTime.setHours(18, 30, 0);   // Set end time to 6:30 PM

        if (selectedTime < startTime || selectedTime > endTime) {
          resolve({ invalidTime: true });
        } else {
          resolve(null);
        }
      });
    };
  }

  resetEndTime() {
    const EndTime: AbstractControl | null = this.ppnCreation.get('EndTime');
    EndTime?.setValue('');
  }

  verifyPincode() {
    this.commonService.getVerifyPincode(this.ppnCreation.get('Pincode')?.value).subscribe((res: any) => {
      //console.log("PINCODE RES ===>", res)
      if (res.success) {
        this.ppnCreation.get('Pincode')?.setErrors(null)
      }
    }, (error: any) => {
      this.ppnCreation.get('Pincode')?.setErrors({ 'invalidPincode': true })
    })
  }
}
