import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-health-info',
  templateUrl: './customer-health-info.component.html',
  styleUrls: ['./customer-health-info.component.scss']
})
export class CustomerHealthInfoComponent implements OnInit {

  healthCustomerInfoForm: FormGroup = new FormGroup({});
  subscription: Subscription;
  isSubmit: boolean = false;

  constructor(private formBuilder: FormBuilder, private ppncreateservice: PpncreatejobService){}

  ngOnInit(): void {
    this.healthCustomerInfoFormBuilder()
    this.healthCustomerInfoOnChange()
  }

  healthCustomerInfoFormBuilder(){
    this.healthCustomerInfoForm = this.formBuilder.group({
      healthCustomerName: new FormControl("", ValidationConstants.nameValidation),
      //healthClaim: new FormControl("", ValidationConstants.policyNumberValidation),
      healthClaim: new FormControl("", ValidationConstants.claimnumber), 
      healthCustomerAdd: new FormControl("", ValidationConstants.addressValidation),
      idproof: new FormControl("", ValidationConstants.requiredValidation),
      contactNum: new FormControl("", ValidationConstants.mobileNoUser),
      alternatecontactno: new FormControl("", ValidationConstants.mobileNoUser),
    });
  }

  healthCustomerInfoOnChange(){
    this.healthCustomerInfoForm.valueChanges.subscribe(formValue => {
      //if(this.healthCustomerInfoForm.status === 'VALID'){
      this.ppncreateservice.healthCustomerInfo.next({ ...formValue, isValid: this.healthCustomerInfoForm.status })
        //console.log('HEALTH CUSTOM INFO FORM VALUE ONCHANGE ', this.healthCustomerInfoForm.status);
      //}

    });
    this.subscription = this.ppncreateservice.isSubmit.subscribe((val) => {
      console.log(val)
      this.isSubmit = val
    })
  }
}
