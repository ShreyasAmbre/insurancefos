import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Zone, Pincode } from '../../../models/StoreTrade/serviceareaInterface';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { StoretradeService } from '../../../services/storetrade/storetrade.service';


@Component({
  selector: 'app-serviceable-area-management',
  templateUrl: './serviceable-area-management.component.html',
  styleUrls: ['./serviceable-area-management.component.scss']
})
export class ServiceableAreaManagementComponent implements OnInit {
  serviceAbleAreaForm!: FormGroup
  zoneList: Zone[] = [];
  pincodeList!: Pincode[];
  toasterStatus: boolean = false
    duplicateErr: string |null;

  constructor(private formBuilder: FormBuilder, private commonService: CommonmasterService, private storeTradeService: StoretradeService) { }

  ngOnInit() {
    this.serviceAbleForm()
    this.getAllZones()
    this.onFormChange()
    this.getToasterStatus()
  }

  serviceAbleForm() {
    this.serviceAbleAreaForm = this.formBuilder.group({
      zone: ['', ValidationConstants.requiredValidation],
      newpincodes: [{ value: '', disabled: true }, ValidationConstants.commaSepratedPincodes],
      pincodecollectoin: ['']
    })
  }

  onFormChange() {
    this.serviceAbleAreaForm.get('zone')?.valueChanges.subscribe(value => {
      const newpincodeInputControl:any = this.serviceAbleAreaForm.get('newpincodes');
      if (value) {
        newpincodeInputControl.enable();
        this.getAllPincodesByZone(Number(value))
      } else {
        newpincodeInputControl.disable();
      }
    })
  }
  getAllZones() {
    this.commonService.GetZoneList().subscribe((res: any) => {
      this.zoneList = res
    })
  }

  getAllPincodesByZone(id: number) {
    this.storeTradeService.getPincodesById(id).subscribe((res: any) => {
      if (res.success) {
        let arrStrOfPincodes = (res.ZonePincode).split(',')
        let pincodeObj = arrStrOfPincodes.map((ele: any, index: number) => {
          return {pincode: ele}
        })
        this.pincodeList = pincodeObj
        //console.log("PIN LIST ", this.pincodeList)
        this.serviceAbleAreaForm.patchValue({ pincodecollectoin: [...this.pincodeList] })
      }
    })
  }

  updatePincodes() {
    this.duplicateErr =null
    let newArrPincode = this.serviceAbleAreaForm.get('newpincodes')?.value ? (this.serviceAbleAreaForm.get('newpincodes')?.value).split(',') : []
    let data = this.serviceAbleAreaForm.get('pincodecollectoin')?.value
    const arrayOfPicodes = data.map((obj: any) => obj.pincode);
    //** Check for duplicate pincodes entries*/
    let dupEntries = newArrPincode.filter((x: string) => arrayOfPicodes.find((el: string) => el == x))
    if (dupEntries.length) {
      this.duplicateErr = 'Duplicate pincodes entered ' + dupEntries+'.';
      return false;
    }
   
    let finalPincodes = [...newArrPincode, ...arrayOfPicodes]
    let reqObj = {
      "ZoneId": this.serviceAbleAreaForm.get('zone')?.value,
      "pinCodes": finalPincodes
    }

    //this.serviceAbleAreaForm.reset()
    this.serviceAbleAreaForm.controls['newpincodes'].reset();
    this.storeTradeService.updateZonePincodes(reqObj).subscribe((res: any) => {
      //console.log("UPDATED Res ===>", res)
      if (res.success) {
        this.userCreated("Pincodes updated successfully")
        newArrPincode.map((ele: any, index: number) => {
          let obj = { pincode: ele }
          this.pincodeList.push(obj)
          this.pincodeList = finalPincodes.map((ele: any, index: number) => {
            return { pincode: ele }
          })
          this.serviceAbleAreaForm.patchValue({ pincodecollectoin: this.pincodeList })

        }) }
    })
    return;
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

  onItemRemoved(ev: any) {
      this.serviceAbleAreaForm.get('newpincodes')?.setValidators([Validators.pattern(/^(\d{6},)*\d{6}$/)]);
      this.serviceAbleAreaForm.get('newpincodes')?.updateValueAndValidity();
    console.log('ddd', this.serviceAbleAreaForm.get('newpincodes')?.value)
  }
}
