import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CreateHealthJob, CreateMotorJob, Products, motorJobResponseUiModel } from 'src/app/models/PPNJob/ppnjobInterface';
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LoaderService } from '../../../services/loader/loader.service';
import { Router } from '@angular/router';
import { format, formatISO } from 'date-fns';
import { CommonmasterService } from '../../../services/common/commonmaster.service';

@Component({
  selector: 'app-ppn-create-job',
  templateUrl: './ppn-create-job.component.html',
  styleUrls: ['./ppn-create-job.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({opacity: 0 }),
            animate('0.5s ease-in',
              style({opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('0.5s ease-out',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class PpnCreateJobComponent implements OnInit {

  products: Products[] = [
    {code: "1", productname: 'Motor'},
    {code: "1", productname: 'Health'}
  ]

  motorSelection = [
    {code: '1', label: 'Pickup Job', id: 'select-pickup-job', nameValue: 'PickUp', checked: false},
    {code: '2', label: 'Drop Job', id: 'select-drop-job',  nameValue: 'Drop', checked: false},
    {code: '3', label: 'Inspection Only', id: 'select-inspection-only',  nameValue: 'Inspection', checked: false}
  ]

  healthSeclection = [
    { code: '1', label: 'WYN Hospitalization', id: 'select-wyn-hospitalization', nameValue: 'Hospitalization',  checked: true},
    { code: '2', label: 'WYN Reimbursement', id: 'select-wyn-reimbursement', nameValue: 'Reimbursement',  checked: false},
  ]
  productForm: FormGroup = new FormGroup({});
  combineCreateJobForm:any = {
  /*  SearchLocationForm: {isValid : 'INVALID'},*/
    //PPNInfoForm: { isValid: 'INVALID' }, //  As we are removing for temporary I m giving VALID hardcoded
    PPNInfoForm: { isValid: 'VALID' },
    custInfoForm: { isValid: 'INVALID' },
    selectSlotForm: { isValid: 'INVALID' },
    motorClaimForm: { isValid: 'INVALID' },
    
  }

  combineHealthJobFrom: any = {
    customerLocateForm: { isValid: 'INVALID' },
    healthCustomerInfoForm: { isValid: 'INVALID' },
    POCDetailsForm: { isValid: 'INVALID' },
    pickUpLocationForm: { isValid: 'INVALID' },
    selectSlotForm: { isValid: 'INVALID' },
    healthCustomerLocateForm: { isValid: 'INVALID' }
  }

  sessionData: any;
  userId: any;
  ecditEmptyJobInput!: motorJobResponseUiModel
  //ecditEmptyJobInput: motorJobResponseUiModel = new motorJobResponseUiModel();
  toasterStatus: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private ppncreateservice: PpncreatejobService,
    private loaderService: LoaderService,
    private router: Router,
    private commonService: CommonmasterService) { }

  ngOnInit(): void {
    this.sessionData = sessionStorage.getItem('userData');
    this.userId = JSON.parse(this.sessionData).userId


    this.productFormBuilder()
    this.productFormOnChange()

    // Subscribtion Motor of Subjects
    this.getCustomerLocationValues()
    this.getPpnInfoValues()
    this.getSlotsValues()
    this.getCustomerInfoValues();
    this.getMotorValues()

    // Subscribtion Health of Subjects
    this.getHealthCustLocValues()
    this.getPickupValues()
    this.getPOCValues()
    this.getHealthCustomerInfoValue()

    this.getToasterStatus()
  }

  productFormBuilder(){
    this.productForm = this.formBuilder.group({
      product: new FormControl("Motor"),
      action: new FormControl(""),
    });
    this.productForm.get('action')?.patchValue('PickUp')

  }


  productFormOnChange() {
    this.productForm.get('product')?.valueChanges.subscribe(value => {
      if(value === 'Motor'){
        this.productForm.get('action')?.patchValue('PickUp')
      }else if(value === 'Health'){
        this.productForm.get('action')?.patchValue('Hospitalization')
      }
    })

    this.productForm.get('action')?.valueChanges.subscribe(value => {
      console.log("PRODUCT FORM ")
      if (value === 'Drop') {
        this.combineCreateJobForm = {
          //SearchLocationForm: { isValid: 'VALID' },
          PPNInfoForm: { isValid: 'INVALID' },
          custInfoForm: { isValid: 'INVALID' },
          selectSlotForm: { isValid: 'INVALID' },
          motorClaimForm: { isValid: 'INVALID' },
          isSubmit: false
        }
      } else if (value === 'Inspection') {
        this.combineCreateJobForm = {
          //SearchLocationForm: { isValid: 'VALID' },
          PPNInfoForm: { isValid: 'INVALID' },
          custInfoForm: { isValid: 'INVALID' },
          selectSlotForm: { isValid: 'INVALID' },
          motorClaimForm: { isValid: 'INVALID' },
          isSubmit: false
        }
      } else if (value === 'PickUp') {
        this.combineCreateJobForm = {
          //SearchLocationForm: { isValid: 'INVALID' },
          PPNInfoForm: { isValid: 'INVALID' },
          custInfoForm: { isValid: 'INVALID' },
          selectSlotForm: { isValid: 'INVALID' },
          motorClaimForm: { isValid: 'INVALID' },
          isSubmit: false
        }
      }
    })

    
  }

  setActionValue(item: any){
    this.productForm.get('action')?.patchValue(item.nameValue)
    //console.log(this.productForm.get('action')?.value === 'PickUp')
  }

  getCustomerLocationValues(){
    this.ppncreateservice.customerLocationSubject.subscribe((formvalues:any) => {
      this.combineCreateJobForm.SearchLocationForm = formvalues
       //console.log("SUBSCRIBE customerLocation ===>", this.combineCreateJobForm)
    })
  }

  getPpnInfoValues(){
    this.ppncreateservice.ppnInfoSubject.subscribe(formvalues => {
      this.combineCreateJobForm.PPNInfoForm = formvalues
      //console.log("SUBSCRIBE PPNInfo ===>", formvalues)
      
    })
  }

  getCustomerInfoValues(){
    this.ppncreateservice.customerInfoSubjec.subscribe(formvalues => {
      this.combineCreateJobForm.custInfoForm = formvalues
      //console.log("SUBSCRIBE custInfo ===>", this.combineCreateJobForm)
    })
  }

  getSlotsValues(){
    this.ppncreateservice.slotsSubject.subscribe(formvalues => {
      if (this.productForm.get('product')?.value === 'Motor') {
        this.combineCreateJobForm.selectSlotForm = formvalues
      } else if (this.productForm.get('product')?.value === 'Health') {
        this.combineHealthJobFrom.selectSlotForm = formvalues
      }
      console.log("subscribe selectslot ===>", this.combineCreateJobForm)
    })
  }

  getMotorValues() {
    this.ppncreateservice.motorClaimForm.subscribe(formvalues => {
      this.combineCreateJobForm.motorClaimForm = formvalues
      //console.log("SUBSCRIBE PPNInfo ===>", formvalues)

    })
  }

  getProductValues(){
    this.combineCreateJobForm.productForm = this.productForm.value
    // console.log("SUBSCRIBE productForm ===>", this.combineCreateJobForm)
  }

  

  // Subsribtion of Health Subjects
  getHealthCustLocValues(){
    this.ppncreateservice.healthCustomerLocateSubject.subscribe(formvalues => {
      this.combineHealthJobFrom.customerLocateForm = formvalues
      //console.log("SUBSCRIBE HEALTH CUSTOMER LOCATE FORM VALUES ===>", this.combineHealthJobFrom)
    })
  }
  
  getPickupValues(){
    this.ppncreateservice.pocDetailsSubject.subscribe(formvalues => {
      this.combineHealthJobFrom.POCDetailsForm = formvalues
      //console.log("SUBSCRIBE HEALTH POC INFO FORM VALUES ===>", this.combineHealthJobFrom)
    })
  }
  
  getPOCValues(){
    this.ppncreateservice.pickupLocationSubject.subscribe(formvalues => {
      this.combineHealthJobFrom.pickUpLocationForm = formvalues
      //console.log("SUBSCRIBE HEALTH PICKUP INFO FORM VALUES ===>", this.combineHealthJobFrom)
    })
  }
  
  getHealthCustomerInfoValue(){
    this.ppncreateservice.healthCustomerInfo.subscribe(formvalues => {
      this.combineHealthJobFrom.healthCustomerInfoForm = formvalues
      //console.log("SUBSCRIBE HEALTH CUSTOMER INFO FORM VALUES ===>", this.combineHealthJobFrom)
    })
  }

  createMotorJob() {
    /* console.log("Motor Job", this.combineCreateJobForm)*/
   /* this.ppncreateservice.isSubmit.next(true);*/
    if (this.combineCreateJobForm.motorClaimForm.isValid === 'INVALID' ||
      this.combineCreateJobForm.PPNInfoForm.isValid === 'INVALID' ||
      this.combineCreateJobForm.custInfoForm.isValid === 'INVALID' ||
      this.combineCreateJobForm.selectSlotForm.isValid === 'INVALID') {
     // setTimeout(() => { document.getElementsByClassName("error_message")[0].parentElement?.classList.add("focus onFocused") },100)
      console.log(this.combineCreateJobForm)
      return;
      }
    let actionMethod = this.productForm.get('action')?.value
    this.loaderService.loadingSub.next(true)

    let reqObj:CreateMotorJob = {
      ServiceType: this.productForm.get('action')?.value,
      CustomerPincode: this.combineCreateJobForm.motorClaimForm.pincode,
      PPNType: this.combineCreateJobForm.motorClaimForm.ppntype,
      PPNId: '203',
      ZoneId: String(this.combineCreateJobForm.motorClaimForm.zoneId),
      ClaimType: "Premium",
      CustomerLocation: this.combineCreateJobForm.motorClaimForm.location,
      PPNAddress: this.combineCreateJobForm.PPNInfoForm.ppnaddress,
      ClaimNumber: actionMethod == 'Drop' ? this.combineCreateJobForm.motorClaimForm.claimMotor : this.combineCreateJobForm.custInfoForm.claimnumber,
      VehicleNumber: this.combineCreateJobForm.custInfoForm.vehiclenumber,
      CustomerContactNo: this.combineCreateJobForm.custInfoForm.customercontactno,
      CustomerName: this.combineCreateJobForm.custInfoForm.customername,
      VehicleColor: this.combineCreateJobForm.custInfoForm.vehiclecolor,
      InstaspectStatus: this.combineCreateJobForm.custInfoForm.instaspectstatus,
      CustomerAddress: this.combineCreateJobForm.custInfoForm.completecustomeraddress,
      AlternateContactNo: String(this.combineCreateJobForm.custInfoForm.alternatePOCnumber),
      InstaspectTime: this.combineCreateJobForm.custInfoForm.instaspecttime ? formatISO(this.combineCreateJobForm.custInfoForm.instaspecttime) : "",
      DSCMName: this.combineCreateJobForm.custInfoForm.DCSMname,
      FirstDiversionPitch: this.combineCreateJobForm.custInfoForm.firstdiversionpitch,
      TaskLeadSource: this.combineCreateJobForm.custInfoForm.taskleadsource,
      VerticalId: String(this.combineCreateJobForm.custInfoForm.verticalMotor) ,
      //ClaimIntiationDate: this.combineCreateJobForm.selectSlotForm.claimintimationdate ?
      //  new Date(this.combineCreateJobForm.selectSlotForm.claimintimationdate).toISOString() : new Date(1, 0, 1).toISOString(),
      ClaimIntiationDate: this.combineCreateJobForm.selectSlotForm.claimintimationdate ?
        formatISO(this.combineCreateJobForm.selectSlotForm.claimintimationdate) : new Date(1, 0, 1).toISOString(),
      ConfirmedPickUp: this.combineCreateJobForm.selectSlotForm.pickupconfirm,
      /* PreferredTimePickUp: this.combineCreateJobForm.selectSlotForm.prefertime,*/
      PreferredTimePickUp: formatISO(this.combineCreateJobForm.selectSlotForm.prefertime),
      StartSlot: formatISO(new Date(this.combineCreateJobForm.selectSlotForm.startslot)),
      EndSlot: formatISO(new Date(this.combineCreateJobForm.selectSlotForm.endslot)),
      CreatedBy: this.userId,
      CustomerLat: "19.040395523389428",
      CustomerLong: "72.86340954174858",

      "DSCMContactNo": this.combineCreateJobForm.custInfoForm.DCSMcontactnumber,
      "PPName": this.combineCreateJobForm.PPNInfoForm.ppnname,
      "PPNContactNo": this.combineCreateJobForm.PPNInfoForm.ppncontact,

      InspectionAddress: this.combineCreateJobForm.custInfoForm.inspectionaddress,
      InspectionLocation: this.combineCreateJobForm.custInfoForm.inspectionlocations
    }
    console.log("REQUEST OBJ ===>", reqObj)

    this.ppncreateservice.createMotorJob(reqObj).subscribe(res => {
      console.log("CREATE MOTOR JOB RES ===>", res)
      this.loaderService.loadingSub.next(false)
      if (res.success === true) {
        this.router.navigate(['./dashboard'])
        this.showJobToaster('Motor Job Created Successfully')
      }
    }, (err: any) => {
      this.loaderService.loadingSub.next(false)
      console.log(err)
    })
  }

  createJob() {
    let productValue = this.productForm.get('product')?.value
    console.log("VALUE ===>", productValue)
    switch (productValue) {
      case 'Motor':
        this.createMotorJob()
        break;
      case 'Health':
        this.createHealthJob()
        break;
    }
  }

  createHealthJob() {
    console.log("VALUE ===> createHealthJob", this.combineHealthJobFrom)
   /* this.ppncreateservice.isSubmit.next(true);*/
    if (
      this.combineHealthJobFrom.customerLocateForm.isValid === 'INVALID' ||
      this.combineHealthJobFrom.isValid === 'INVALID' ||
      this.combineHealthJobFrom.POCDetailsForm.isValid === 'INVALID' ||
      this.combineHealthJobFrom.pickUpLocationForm.isValid === 'INVALID' ||
      this.combineHealthJobFrom.selectSlotForm.isValid === 'INVALID') {
      return;
      }
    /*  this.loaderService.loadingSub.next(true)*/
    //EndSlot, InstaspectTime, PreferredTimePickUp, StartSlot,

    this.loaderService.loadingSub.next(true)
    let reqObj: CreateHealthJob = {
      ServiceType: this.productForm.get('action')?.value,
      CustomerPincode: this.combineHealthJobFrom.customerLocateForm.hospitalPinCode,
      CustomerLat: '19.040395523389428',
      CustomerLong: '72.86340954174858',
      CustomerName: this.combineHealthJobFrom.healthCustomerInfoForm.healthCustomerName,
      ClaimNumber: this.combineHealthJobFrom.healthCustomerInfoForm.healthClaim,
      CustomerAddress: this.combineHealthJobFrom.healthCustomerInfoForm.healthCustomerAdd,
      CustomerProofIdNumber: this.combineHealthJobFrom.healthCustomerInfoForm.idproof,
      CustomerContactNo: this.combineHealthJobFrom.healthCustomerInfoForm.contactNum,
      AlternateContactNo: this.combineHealthJobFrom.healthCustomerInfoForm.alternatecontactno,
      POCName: this.combineHealthJobFrom.POCDetailsForm.POCname,
      POCContactNo: this.combineHealthJobFrom.POCDetailsForm.POCcontactno,
      POCAddress: this.combineHealthJobFrom.POCDetailsForm.POCaddress,
      SpecificationOfDocter: this.combineHealthJobFrom.POCDetailsForm.specification,
      POCIdProof: this.combineHealthJobFrom.POCDetailsForm.IDproof,
      POCIdNumber: this.combineHealthJobFrom.POCDetailsForm.ICnumber,
      HospitalName: this.combineHealthJobFrom.pickUpLocationForm.hospitalname,
      MarkedAddress: this.combineHealthJobFrom.pickUpLocationForm.pickupaddress,
      AddressType: this.combineHealthJobFrom.pickUpLocationForm.addresstype,
      DocumentCollection: this.combineHealthJobFrom.customerLocateForm.documentlist,
      OtherDocuments: this.combineHealthJobFrom.customerLocateForm.otherdocument,
      StartSlot: formatISO(new Date(this.combineHealthJobFrom.selectSlotForm.startslot)),
      EndSlot: formatISO(new Date(this.combineHealthJobFrom.selectSlotForm.endslot)),
      CreatedBy: this.userId,
      ZoneId: this.combineHealthJobFrom.customerLocateForm.zoneId,
    }

    console.log("REQUEST OBJ HEALTH ===>", reqObj)
    this.ppncreateservice.createHealthJob(reqObj).subscribe(res => {
      console.log("CREATE HEALTH JOB RES ===>", res)
      this.loaderService.loadingSub.next(false)
      if (res.success === true) {
        this.router.navigate(['./dashboard'])
        this.showJobToaster('Health Job Created Successfully')
      }
    }, (err: any) => {
      this.loaderService.loadingSub.next(false)
      console.log(err)
    })
  }

  getToasterStatus() {
    this.commonService.userPopup.subscribe((value: any) => {
      this.toasterStatus = value.status
    })
  }

  showJobToaster(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
  }
}
