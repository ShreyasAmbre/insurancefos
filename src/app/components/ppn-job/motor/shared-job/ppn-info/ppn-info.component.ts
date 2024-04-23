import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { CommonmasterService } from '../../../../../services/common/commonmaster.service';
import { motorJobResponseUiModel } from 'src/app/models/PPNJob/ppnjobInterface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ppn-info',
  templateUrl: './ppn-info.component.html',
  styleUrls: ['./ppn-info.component.scss']
})
export class PpnInfoComponent implements OnInit, OnDestroy  {
  @Input() actonSelect: string | undefined;
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;
  @Input() editPpnInfoData: motorJobResponseUiModel;

  ppnInfoForm: FormGroup = new FormGroup({});
  id: string | null;
  subscription: Subscription;
    isSubmit: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private ppncreateservice: PpncreatejobService,
    private commonService: CommonmasterService,
    private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id"); }

  ngOnInit(): void {
    if (!this.id) {
      this.editPpnInfoData = new motorJobResponseUiModel();
    }
    this.ppnInfoFormBuilder()
    this.ppnInfoOnChange()
    this.getDropClaimDetails()
  }

  ppnInfoFormBuilder(){
    this.ppnInfoForm = this.formBuilder.group({
      /* searchppn: new FormControl(""),*/
      ppnname: new FormControl( this.editPpnInfoData.PPNName, ValidationConstants.nameValidation),
      ppncontact: new FormControl(this.editPpnInfoData.PPNContact, ValidationConstants.mobileNoUser),
      ppnaddress: new FormControl(this.editPpnInfoData.PPNAddress, ValidationConstants.ppnAddressValidation)
    });
    if (this.id) {
      this.ppncreateservice.ppnInfoSubject.next({ ...this.ppnInfoForm.value, isValid: "VALID" })
    }
  }
  // gettter for form controls
  get ppnInfoFormDetails() {
    return this.ppnInfoForm.controls;
  }
  get ppnname() {
    return this.ppnInfoFormDetails["ppnname"]
  }
  get ppncontact() {
    return this.ppnInfoForm.controls["ppncontact"]
  }
  get ppnaddress() {
    return this.ppnInfoForm.controls["ppnaddress"]
  }
  //-----end ----------
  ppnInfoOnChange(){
    this.ppnInfoForm.valueChanges.subscribe(formValue => {
      // if(this.ppnInfoForm.status === 'VALID'){
        this.ppncreateservice.ppnInfoSubject.next({...formValue, isValid: "VALID"})
        // console.log('PPN INFO FORM VALUE ONCHANGE ', this.ppnInfoForm.status);
      // }
    });

    this.subscription = this.ppncreateservice.isSubmit.subscribe((val) => {
      console.log(val)
      this.isSubmit = val
    })
    this.setDynamicValidaiton()
  }

  setDynamicValidaiton() {
    switch (this.actonSelect) {
      case 'Drop':
        //this.ppnInfoForm.controls['searchppn'].setValidators(ValidationConstants.requiredValidation);
        this.ppnInfoForm.controls['ppnname'].setValidators(ValidationConstants.requiredValidation);
        this.ppnInfoForm.controls['ppncontact'].setValidators(ValidationConstants.requiredValidation);
        this.ppnInfoForm.controls['ppnaddress'].setValidators(ValidationConstants.requiredValidation);
        //this.ppnInfoForm.controls['searchppn'].updateValueAndValidity();
        this.ppnInfoForm.controls['ppnname'].updateValueAndValidity();
        this.ppnInfoForm.controls['ppncontact'].updateValueAndValidity();
        this.ppnInfoForm.controls['ppnaddress'].updateValueAndValidity();
       break;
    }
  }

  getDropClaimDetails() {
    if (this.actonSelect === 'Drop') {
      this.ppncreateservice.dropJobClaimDetails.subscribe((fromValues: any) => {
        //console.log("AUTO CLAIM SUBSCRIBE =>", fromValues)
        this.ppnInfoForm.patchValue({
          ppnname: fromValues.PPNName,
          ppncontact: fromValues.PPNContactNumber,
          ppnaddress: fromValues.PPNAddress,
        })
        //setTimeout(() => {
          this.inputFields.forEach(inputField => {
            inputField.nativeElement.focus();
          });
        //}, 500) 
      })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
