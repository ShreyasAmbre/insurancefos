import { Component, Input, OnInit } from '@angular/core';
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditMotorJobRequest, motorJobResponseUiModel } from 'src/app/models/PPNJob/ppnjobInterface';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonmasterService } from '../../../../services/common/commonmaster.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {
  @Input() actionSelected: string = '';
  @Input() form!: FormGroup;
  showSlotCalendar: boolean = false
  zoneData: any = {} 
  selectedSlotData = ''
  userData: any;
  toasterStatus: boolean = false;
  editJobRequest: EditMotorJobRequest = new EditMotorJobRequest();
  selectedCategory: motorJobResponseUiModel;
  combineCreateJobForm: any = {
    customerLocateForm: { isValid: 'INVALID' },
    healthCustomerInfoForm: { isValid: 'INVALID' },
    POCDetailsForm: { isValid: 'INVALID' },
    pickUpLocationForm: { isValid: 'INVALID' },
    selectSlotForm: { isValid: 'INVALID' },
    healthCustomerLocateForm: { isValid: 'INVALID' }
  }; 
  constructor(private ppncreateservice: PpncreatejobService,
    private formBuilder: FormBuilder, 
    private loaderService: LoaderService,
    private location: Location,
    private commonService: CommonmasterService,
    private router: Router) {
    this.getPpnInfoValues();
    this.getSlotsValues();
    this.getCustomerInfoValues();
    this.getMotorValues();
}

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userData') || '');
 
    this.selectedCategory = history.state;
    this.selectedCategory.IsEdit = true;
   
    console.log(this.selectedCategory); 
   
  }
  createForm() {

    this.combineCreateJobForm = new FormGroup({
      customerInfoForm: this.formBuilder.group({}),

      motorClaimForm: this.formBuilder.group({}),

      ppnInfoForm: this.formBuilder.group({})
    });

    console.log(this.combineCreateJobForm)
  }

  sendSelectedSlot(event: any) {
    this.selectedSlotData = event
  } 
  getPpnInfoValues() {
    this.ppncreateservice.ppnInfoSubject.subscribe(formvalues => {
      this.combineCreateJobForm.PPNInfoForm = formvalues
      console.log("SUBSCRIBE PPNInfo ===>", formvalues)

    })
  }

  getCustomerInfoValues() {
    this.ppncreateservice.customerInfoSubjec.subscribe(formvalues => {
      this.combineCreateJobForm.custInfoForm = formvalues
      console.log("SUBSCRIBE custInfo ===>", this.combineCreateJobForm)
    })
  }

  getSlotsValues() {
    this.ppncreateservice.slotsSubject.subscribe(formvalues => {
      
        this.combineCreateJobForm.selectSlotForm = formvalues
      
      console.log("subscribe selectslot ===>", this.combineCreateJobForm)
    })
  }

  getMotorValues() {
    this.ppncreateservice.motorClaimForm.subscribe(formvalues => {
      this.combineCreateJobForm.motorClaimForm = formvalues
      console.log("SUBSCRIBE PPNInfo ===>", formvalues)

    })
  }
  editJob() {

    this.ppncreateservice.isSubmit.next(true);
    if (this.combineCreateJobForm.motorClaimForm.isValid == 'INVALID' ||
      this.combineCreateJobForm.PPNInfoForm.isValid == 'INVALID' ||
      this.combineCreateJobForm.custInfoForm.isValid == 'INVALID' ||
      this.combineCreateJobForm.selectSlotForm.isValid == 'INVALID') {
      return;
      }
    this.editJobRequest.PPNType = this.combineCreateJobForm.motorClaimForm.ppntype;
    this.editJobRequest.PPNId ='205';
    this.editJobRequest.JobProductType = "Motor";
    this.editJobRequest.VehicleColor = this.selectedCategory.VehicleColor;
    this.editJobRequest.InstaspectStatus = this.combineCreateJobForm.custInfoForm.instaspectstatus;
    this.editJobRequest.DCSMContact = this.combineCreateJobForm.custInfoForm.alternatePOCnumber;
    this.editJobRequest.ConfirmedPickUp = this.combineCreateJobForm.selectSlotForm.pickupconfirm;
    this.editJobRequest.ModifiedBy = this.userData.userId;
    this.editJobRequest.JobId = this.selectedCategory.JobId //this.combineCreateJobForm.selectSlotForm.pickupconfirm;
    console.log(this.combineCreateJobForm)
      this.loaderService.loadingSub.next(true)
    this.ppncreateservice.editMotorJob(this.editJobRequest).subscribe(res => {
 /*     alert('Job edited scuessfully')*/
      this.showToaster("Job edited scuessfully.")
      console.log("CREATE HEALTH JOB RES ===>", res)
      this.loaderService.loadingSub.next(false)
      if (res.success === true) {
        this.router.navigate(['./dashboard']);
      }
    }, (err: any) => {
      this.loaderService.loadingSub.next(false)
      console.log(err)
    })
  }

  goBack() {
    this.location.back();
  }

  getToasterStatus() {
    this.commonService.userPopup.subscribe((value: any) => {
      this.toasterStatus = value.status
     /* this.toasterIsSuccess = value.isSuccess*/
    })

  }

  showToaster(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
  }
}
