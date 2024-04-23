import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PpnTypeOption, motorJobResponseUiModel, pickupConfirmOption } from 'src/app/models/PPNJob/ppnjobInterface';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import { PpnmasterService } from '../../../../../services/ppnmaster/ppnmaster.service';
import { CommonmasterService } from '../../../../../services/common/commonmaster.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-motor-claim',
  templateUrl: './motor-claim.component.html',
  styleUrls: ['./motor-claim.component.scss']
})
export class MotorClaimComponent implements OnInit, OnDestroy {
  @Input() vehicalDrop: boolean = false;
  @Input() actonSelect: string | undefined;
  @Input() editPpnInfoData: motorJobResponseUiModel;
  motorClaimForm: FormGroup = new FormGroup({});
  ppntypeOption: PpnTypeOption[] = []
  mapImage = false;
  claimMotor: any = {};
  id: string | null;
  subscription: Subscription;
    isSubmit: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private ppncreateservice: PpncreatejobService,
    private ppnmasterSearvice: PpnmasterService,
    private commonService: CommonmasterService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
}

  ngOnInit(): void {
    if (!this.id) {
      this.editPpnInfoData = new motorJobResponseUiModel();
    }
    this.motorClaimFormBuilder();
    this.getPPNcategory();
    this.motorOnChange();
    this.getDropClaimDetails()
  }


  motorClaimFormBuilder() {
    this.motorClaimForm = this.formBuilder.group({
      pincode: new FormControl({ value: this.editPpnInfoData.Pincode, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.pinCodeValidation),
      ppntype: new FormControl(this.editPpnInfoData.PPNType, ValidationConstants.requiredValidation),
      location: new FormControl({ value: this.editPpnInfoData.CustomerLocation, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.addressValidation),
      zoneId: new FormControl(this.editPpnInfoData.ZoneId)
     });
    if (this.actonSelect === 'Drop') {
      this.motorClaimForm.addControl('claimMotor', new FormControl(this.editPpnInfoData.ClaimNumber, ValidationConstants.requiredValidation));
    }

    if (this.id) {
      this.ppncreateservice.motorClaimForm.next({ ...this.motorClaimForm.value, isValid: this.motorClaimForm.status })
    }
  }



  getPPNcategory() {
    this.commonService.getPPNcategory().subscribe({
      next: (data: any[]) => {
        this.ppntypeOption = data
        //this.ppntypeOption = data.map((item: any) => item.ppnCategory);
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  motorOnChange() {
    this.motorClaimForm.valueChanges.subscribe(formValue => {
      //if (this.selectSlotForm.status === 'VALID') {
      this.ppncreateservice.motorClaimForm.next({ ...formValue, isValid: this.motorClaimForm.status })
      //console.log('SLOT INFO FORM VALUE ONCHANGE ', this.selectSlotForm.status);
      //}
    });
    this.subscription = this.ppncreateservice.isSubmit.subscribe((val) => {
      console.log(val)
      this.isSubmit = val
    })
  }

  toggleImage() {
    this.mapImage = !this.mapImage;
  }
  closeImage() {
    this.mapImage = false;
  }

  verifyPincode() {
    //this.motorClaimForm.controls['location'].setValue('sssssss');
  /*  this.motorClaimForm.patchValue({ location: 'aasss' });*/
    this.commonService.getVerifyPincode(this.motorClaimForm.get('pincode')?.value).subscribe((res: any) => {
      if (res.success) {
        //console.log("VERIFY PINCODE RES ===>", res)
        this.motorClaimForm.patchValue({ zoneId: Number(res.ZoneAccessArea) })
        this.ppncreateservice.zoneData['zoneId'] = this.motorClaimForm.get('zoneId')?.value
        this.motorClaimForm.get('pincode')?.setErrors(null)
      }
    }, (error: any) => {
      this.motorClaimForm.get('pincode')?.setErrors({ 'invalidPincode': true })
    })
  }
 

  verifyClaimNumber() {
    let reqObj = {
      ClaimNumber: this.motorClaimForm.get('claimMotor')?.value,
      JobProductType: 'Motor'
    }
    this.commonService.getClaimNumber(reqObj).subscribe((res: any) => {
      //console.log("AUTO CLAIM RES =>", res)
      this.ppncreateservice.dropJobClaimDetails.next(res)
      
    }, (error: any) => {
      this.motorClaimForm.get('claimMotor')?.setErrors({ 'invalidClaim': true })
    })
  }

  getDropClaimDetails() {
    if (this.actonSelect === 'Drop') {
      this.ppncreateservice.dropJobClaimDetails.subscribe((fromValues: any) => {
        //console.log("AUTO CLAIM SUBSCRIBE =>", fromValues)
        this.motorClaimForm.patchValue({
          pincode: fromValues.CustomerPincode,
          location: fromValues.PPNContactNumber,
        })

        if (fromValues.CustomerPincode) {
          this.verifyPincode()
        }

      })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
