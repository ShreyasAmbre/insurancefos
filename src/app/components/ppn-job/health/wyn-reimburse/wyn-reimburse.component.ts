import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { CommonmasterService } from '../../../../services/common/commonmaster.service';
import { documentListOptions } from '../../../../models/PPNJob/ppnjobInterface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wyn-reimburse',
  templateUrl: './wyn-reimburse.component.html',
  styleUrls: ['./wyn-reimburse.component.scss']
})
export class WynReimburseComponent implements OnInit {

  healthCustomerLocateForm: FormGroup = new FormGroup({});
  @Input() actonSelect: string = '';
  showSlotCalendar: boolean = false
  zoneData: any = {}
  showImage = false;
  selectedSlotData = ''
  subscription: Subscription;
  isSubmit: boolean = false;



  documentListOptions: documentListOptions[] = [
    { name: 'Photo Identity Proof (Customer)', code: "1" },
    { name: 'Pharmacy bills', code: "2" },
    { name: 'Other documents and DCSM', code: "3" },
    { name: 'Investigation reports', code: "4" },
    { name: 'Interim Hospital bill', code: "5" },
    { name: 'Indoor case papers', code: "6" },
    { name: 'Implant sticker (if applicable)', code: "7" },
    { name: 'Implant invoice (if applicable)', code: "8" },
    { name: 'Identity Proof (POC)', code: "9" },
    { name: 'Identity Proof (Patient)', code: "10" },
    { name: 'Final hospital bill', code: "11" },
    { name: 'Discharge summary', code: "12" },
    { name: 'Customer KYC form', code: "13" },
    { name: 'Consultation papers', code: "14" },
    { name: 'Cancelled Cheque', code: "15" },
    { name: 'Authorisation letter', code: "16" }
  ];

  documentLists: any = '';
  constructor(private formBuilder: FormBuilder,
    private ppncreateservice: PpncreatejobService,
    private commonService: CommonmasterService) { }

  ngOnInit(): void {
    this.healthCustomerLocateFormBuilder()
    this.healthCustomerLocateOnChange()
    this.getSlotCalendarStatus()


  }

  healthCustomerLocateFormBuilder(){
    this.healthCustomerLocateForm = this.formBuilder.group({     
      hospitalPinCode: new FormControl("", ValidationConstants.WynPinCode),
      documentlist: new FormControl("", ValidationConstants.requiredValidation),
      otherdocument: new FormControl("", ValidationConstants.requiredValidation),
      zoneId: new FormControl(null)
    });
  }

  healthCustomerLocateOnChange(){
    this.healthCustomerLocateForm.valueChanges.subscribe(formValue => {
      if(this.healthCustomerLocateForm.status === 'VALID'){
        this.ppncreateservice.healthCustomerLocateSubject.next(formValue)
        console.log('HEALTH CUSTOM LOCATE FORM VALUE ONCHANGE ', this.healthCustomerLocateForm.status);
      }
    });
    this.subscription = this.ppncreateservice.isSubmit.subscribe((val) => {
      console.log(val)
      this.isSubmit = val
    })
  }

  verifyPincode() {
    //this.motorClaimForm.controls['location'].setValue('sssssss');
    this.healthCustomerLocateForm.patchValue({ location: 'aasss' });
    this.commonService.getVerifyPincode(this.healthCustomerLocateForm.get('hospitalPinCode')?.value).subscribe((res: any) => {
      if (res.success) {
        //console.log("VERIFY PINCODE RES ===>", res)
        this.healthCustomerLocateForm.patchValue({ zoneId: Number(res.ZoneAccessArea) })

        this.ppncreateservice.zoneData['zoneId'] = this.healthCustomerLocateForm.get('zoneId')?.value
        console.log("response", this.healthCustomerLocateForm.get('zoneId')?.value)
        this.healthCustomerLocateForm.get('hospitalPinCode')?.setErrors(null)
      }
    }, (error: any) => {
      this.healthCustomerLocateForm.get('hospitalPinCode')?.setErrors({ 'invalidPincode': true })
    })
  }

  getSlotCalendarStatus() {
    this.ppncreateservice.showSlotCalendar.subscribe((value: any) => {

      this.zoneData['zoneId'] = this.ppncreateservice.zoneData['zoneId']
      console.log("STATUS SLOT CALENDAR", this.ppncreateservice.zoneData['zoneId'])
      this.showSlotCalendar = value
    })
  }

  sendSelectedSlot(event: any) {
    this.selectedSlotData = event
  }


  onDocumentListChange(selectedDocuments: any) {
    let valuesList = new Set();
    for (let i = 0; i < selectedDocuments.value.length; i++) {
      valuesList.add(selectedDocuments.value[i].name);
    }
    let values = '';
    for (let element of valuesList) {
      values += element + ',';
    }
    this.healthCustomerLocateForm.controls['documentlist'].setValue(values);
  }
}
