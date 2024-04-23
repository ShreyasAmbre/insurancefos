import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poc-details',
  templateUrl: './poc-details.component.html',
  styleUrls: ['./poc-details.component.scss']
})
export class PocDetailsComponent implements OnInit {

  pocInfoForm: FormGroup = new FormGroup({});
  subscription: Subscription;
  isSubmit: boolean = false;

  constructor(private formBuilder: FormBuilder, private ppncreateservice: PpncreatejobService){}

  ngOnInit(): void {
    this.pocInfoFormBuilder()
    this.pocInfoFormOnChange()
  }

  pocInfoFormBuilder(){
    this.pocInfoForm = this.formBuilder.group({
      POCname: new FormControl("", ValidationConstants.nameValidation),
      POCcontactno: new FormControl("", ValidationConstants.phoneNumberValidation),
      POCaddress: new FormControl("", ValidationConstants.addressValidation),
      specification: new FormControl("", ValidationConstants.requiredValidation),
      IDproof: new FormControl("", ValidationConstants.requiredValidation),
      ICnumber: new FormControl("", ValidationConstants.requiredValidation),
    });
  }

  pocInfoFormOnChange(){
    this.pocInfoForm.valueChanges.subscribe(formValue => {
      //if(this.pocInfoForm.status === 'VALID'){
        this.ppncreateservice.pocDetailsSubject.next({ ...formValue, isValid: this.pocInfoForm.status })
        //console.log('HEALTH POC INFO FORM VALUE ONCHANGE ', this.pocInfoForm.status);
      //}
    });
    this.subscription = this.ppncreateservice.isSubmit.subscribe((val) => {
      console.log(val)
      this.isSubmit = val
    })
  }

}
