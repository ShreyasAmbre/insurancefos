import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { firstDiversionOptions, instaspectOptions, motorJobResponseUiModel, taskLeadOptions } from 'src/app/models/PPNJob/ppnjobInterface';
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { PpnmasterService } from '../../../../../services/ppnmaster/ppnmaster.service';
import { CommonmasterService } from '../../../../../services/common/commonmaster.service';
import { ActivatedRoute } from '@angular/router';
import { IVertical } from '../../../../../models/CommonInterface/CommonInterface.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
  @Input() actonSelect: string = '';
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;
 @Input() editPpnInfoData: motorJobResponseUiModel;

  instaspectOptions: instaspectOptions[] = [
    {code: "1", option: 'Pending'},
    { code: "2", option: 'Completed'}
  ]
  firstDiversionOptions: firstDiversionOptions[] = [
    {code: "1", option: 'Yes'},
    {code: "2", option: 'No'}
  ]
  taskLeadOptions: taskLeadOptions[] =[
    {code: "1", option: 'FT'},
    { code: "2", option: 'FOS Portal' },
    { code: "3", option: 'FNOL' },
  ]
  customerInfoForm: FormGroup = new FormGroup({});
  verticalOption: IVertical[] = []
  responseData: any; // Declare responseData property
    motorClaimForm: FormGroup = new FormGroup({});
    id: string | null;
  isSubmit: boolean = false;
  subscription: Subscription;


  constructor(private formBuilder: FormBuilder,
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
    this.customerInfoFormBuilder()
    this.customerInfoOnChange()
    this.getVertical()
    this.getDropClaimDetails()
   }



  customerInfoOnChange(){
    this.customerInfoForm.valueChanges.subscribe(formValue => {
      // if(this.customerInfoForm.status === 'VALID'){
        this.ppncreateservice.customerInfoSubjec.next({...formValue, isValid: this.customerInfoForm.status})
        console.log('cust INFO FORM VALUE ONCHANGE ', this.customerInfoForm);
      // }

    });

    this.subscription = this.ppncreateservice.isSubmit.subscribe((val) => {
      console.log(val)
      this.isSubmit = val
    })
  }

  getVertical() {
    this.commonService.getVertical().subscribe({
      next: (data: any) => {
        console.log("PPN TYPE RES ===>", data)
        this.verticalOption = data.vertical
        //this.ppntypeOption = data.map((item: any) => item.ppnCategory);
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  customerInfoFormBuilder() {
    switch (this.actonSelect) {
      case 'PickUp':
        this.pickUpFormBuilder()
        break;

      case 'Drop':
        this.dropFromBuilder()
        break;

      case 'Inspection':
        this.inspectionFormBuilder()
        break;
    }
    if (this.id) {
      this.ppncreateservice.customerInfoSubjec.next({ ...this.customerInfoForm.value, isValid: this.customerInfoForm.status }) 
    }
  }

  pickUpFormBuilder() {
    let instTime = this.editPpnInfoData.InstaspectTime ? new Date(this.editPpnInfoData.InstaspectTime) : '';
    let initialInstaspectStatus = this.editPpnInfoData.InstaspectStatus ? this.editPpnInfoData.InstaspectStatus : 'Completed';
    this.customerInfoForm = this.formBuilder.group({
      claimnumber: new FormControl({ value: this.editPpnInfoData.ClaimNumber, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.claimnumber),
      vehiclenumber: new FormControl({ value: this.editPpnInfoData.VehicleNumber, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.vehicleNumberValidation),
      customercontactno: new FormControl({ value: this.editPpnInfoData.CustomerContactNo, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.phoneNumberValidation),
      customername: new FormControl({ value: this.editPpnInfoData.CustomerName, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.nameValidation),
      vehiclecolor: new FormControl({ value: this.editPpnInfoData.VehicleColor, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.colourValidation),
      instaspectstatus: new FormControl({ value: initialInstaspectStatus,  disabled: false }, ValidationConstants.colourValidation),
      completecustomeraddress: new FormControl({ value: this.editPpnInfoData.CustomerAddress, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation),
      /*   alternatePOCnumber: new FormControl(this.editPpnInfoData.AlternatePOCNo, ValidationConstants.phoneNumberValidation),*/
      alternatePOCnumber: new FormControl({ value: this.editPpnInfoData.AlternatePOCNo, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.alternatePOCNumberValidation),

      DCSMname: new FormControl({ value: this.editPpnInfoData.DSCMName, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.DCSMnameValidation),
      instaspecttime: new FormControl({ value: instTime, disabled: this.editPpnInfoData.IsEdit }),
      firstdiversionpitch: new FormControl({ value: 'Yes', disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation),
      taskleadsource: new FormControl({ value: 'FOS Portal',  disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation),
      verticalMotor: new FormControl(this.editPpnInfoData.IsEdit? '1':'', this.editPpnInfoData.IsEdit ? null : ValidationConstants.requiredValidation),
    });
  }

  dropFromBuilder() {
    let instTime = this.editPpnInfoData.InstaspectTime ? new Date(this.editPpnInfoData.InstaspectTime) : '';
    this.customerInfoForm = this.formBuilder.group({
      vehiclenumber: new FormControl({ value: this.editPpnInfoData.VehicleNumber, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.vehicleNumberValidation),
      customercontactno: new FormControl({ value: this.editPpnInfoData.CustomerContactNo, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.phoneNumberValidation),
      customername: new FormControl({ value: this.editPpnInfoData.CustomerName, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.nameValidation),
      vehiclecolor: new FormControl({ value: this.editPpnInfoData.VehicleColor, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.colourValidation),
      completecustomeraddress: new FormControl({ value: this.editPpnInfoData.CustomerAddress, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation),
      alternatePOCnumber: new FormControl({ value: this.editPpnInfoData.AlternatePOCNo, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.alternatePOCNumberValidation),
      DCSMname: new FormControl({ value: this.editPpnInfoData.DSCMName, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.DCSMnameValidation),
      instaspecttime: new FormControl(instTime),
      firstdiversionpitch: new FormControl({ value: this.editPpnInfoData.FirstDiversionPitch, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation),
      taskleadsource: new FormControl({ value: 'FOS Portal',   disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation),
      verticalMotor: new FormControl(this.editPpnInfoData.IsEdit ? '1' : '', this.editPpnInfoData.IsEdit ? null : ValidationConstants.requiredValidation),
    });
  }

  inspectionFormBuilder() {
    let instTime = this.editPpnInfoData.InstaspectTime ? new Date(this.editPpnInfoData.InstaspectTime) : '';
    this.customerInfoForm = this.formBuilder.group({
      claimnumber: new FormControl({ value: this.editPpnInfoData.ClaimNumber, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.claimnumber),
      vehiclenumber: new FormControl({ value: this.editPpnInfoData.VehicleColor, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.vehicleNumberValidation),
      customercontactno: new FormControl({ value: this.editPpnInfoData.CustomerContactNo, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.phoneNumberValidation),
      customername: new FormControl({ value: this.editPpnInfoData.CustomerName, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.nameValidation),
      vehiclecolor: new FormControl({ value: this.editPpnInfoData.VehicleColor, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.colourValidation),
      instaspectstatus: new FormControl({ value: "2", disabled: false },  ValidationConstants.colourValidation),
      completecustomeraddress: new FormControl({ value: this.editPpnInfoData.CustomerAddress, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation),
      alternatePOCnumber: new FormControl({ value: this.editPpnInfoData.AlternatePOCNo, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.alternatePOCNumberValidation),
      DCSMname: new FormControl({ value: this.editPpnInfoData.DSCMName, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.DCSMnameValidation),
      instaspecttime: new FormControl({ value: instTime, disabled: this.editPpnInfoData.IsEdit }),
      firstdiversionpitch: new FormControl({ value: this.editPpnInfoData.FirstDiversionPitch, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation),
      taskleadsource: new FormControl({ value: '', disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation),
      verticalMotor: new FormControl(this.editPpnInfoData.IsEdit ? '1' : '', this.editPpnInfoData.IsEdit ? null : ValidationConstants.requiredValidation),
    });
  }


  getDropClaimDetails() {
    if (this.actonSelect === 'Drop') {
      this.ppncreateservice.dropJobClaimDetails.subscribe((fromValues: any) => {
        //console.log("AUTO CLAIM SUBSCRIBE =>", fromValues)
        this.customerInfoForm.patchValue({
          vehiclenumber: fromValues.VehicleNumber,
          customercontactno: fromValues.CustomerContactNo,
          customername: fromValues.CustomerName,
          vehiclecolor: fromValues.VehicleColor,
          completecustomeraddress: fromValues.CustomerAddress,
          alternatePOCnumber: fromValues.AlternateContactNo,
          firstdiversionpitch: fromValues.FirstDiversionPitch,
          taskleadsource: fromValues.TaskLeadSource,
          verticalMotor: fromValues.VerticalId
        })
        //setTimeout(() => {
        this.inputFields.forEach(inputField => {
          inputField.nativeElement.focus();
        });
        //}, 500)
      })
    }
  }
  // getter for form controls
   getCustomerFormValue(fieldName:string) {
     return this.customerInfoForm.controls[fieldName].value;
  }
  //-----end ----------
  getInstaSpectOptionValue(array: any[], option: string) {
    if (!Array.isArray(array) || !option) return "";
    return array.find(x => x.option == option) 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
