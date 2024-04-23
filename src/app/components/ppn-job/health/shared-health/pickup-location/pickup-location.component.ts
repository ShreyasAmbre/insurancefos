import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { hospitalAddress } from '../../../../../models/PPNJob/ppnjobInterface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pickup-location',
  templateUrl: './pickup-location.component.html',
  styleUrls: ['./pickup-location.component.scss']
})
export class PickupLocationComponent implements OnInit {

  pickupInfoForm: FormGroup = new FormGroup({});
  mapImage = false;
  subscription: Subscription;
  isSubmit: boolean = false;

  hospitalAddress: hospitalAddress[] = [
    { code: "1", option: 'Home' },
    { code: "2", option: 'Hospital' },
  ]
  constructor(private formBuilder: FormBuilder, private ppncreateservice: PpncreatejobService){}

  ngOnInit(): void {
    this.pickupFromBuilder()
    this.pickupFormOnChange()
  }

  pickupFromBuilder(){
    this.pickupInfoForm = this.formBuilder.group({
      hospitalname: new FormControl("", ValidationConstants.requiredValidation),
      addresstype: new FormControl("", ValidationConstants.requiredValidation),
      pickupaddress: new FormControl("", ValidationConstants.requiredValidation),
    });
  }

  pickupFormOnChange(){
    this.pickupInfoForm.valueChanges.subscribe(formValue => {
      //if(this.pickupInfoForm.status === 'VALID'){
      this.ppncreateservice.pickupLocationSubject.next({ ...formValue, isValid: this.pickupInfoForm.status })
        //console.log('HEALTH PICKUP INFO FORM VALUE ONCHANGE ', this.pickupInfoForm.status);
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

}
