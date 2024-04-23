import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import { motorJobResponseUiModel, pickupConfirmOption } from 'src/app/models/PPNJob/ppnjobInterface';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-slot',
  templateUrl: './select-slot.component.html',
  styleUrls: ['./select-slot.component.scss']
})
export class SelectSlotComponent implements OnChanges, OnDestroy {
  @Input() selectedSlotData: any = '';
  @Input() actonSelect: string = '';
  @Input() editPpnInfoData!: motorJobResponseUiModel;
  selectSlotForm: FormGroup = new FormGroup({});
  pickupConfirmOption: pickupConfirmOption[] = [
    { code: "1", option: 'Yes' },
    { code: "2", option: 'No' }
  ]
  id: string | null;
  subscription: Subscription;
  isSubmit: boolean = false;
  minmaxDateSelection = new Date()

  constructor(private formBuilder: FormBuilder,
    private ppncreateservice: PpncreatejobService,
    private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
}
  

  ngOnInit(): void {
    if (!this.id) {
      this.editPpnInfoData = new motorJobResponseUiModel();
    }
    console.log("EDIT JOB =>", this.editPpnInfoData)
    this.slotFormBuilder()
    this.slotOnChange()
    this.getDropClaimDetails()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.patchSelectedSlot()
  }

  slotFormBuilder(){
    this.selectSlotForm = this.formBuilder.group({
    
      startslot: new FormControl({ value: this.editPpnInfoData.StartSlot, disabled: this.editPpnInfoData.IsEdit },  ValidationConstants.requiredValidation),
      endslot: new FormControl({ value: this.editPpnInfoData.EndSlot, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation),
    });
    console.log("Job", this.actonSelect);
    if /*(this.actonSelect === 'Drop' || this.actonSelect === 'PickUP' || this.actonSelect === 'Inspection')*/
      (this.actonSelect === 'Drop' || this.actonSelect === 'Inspection' || this.actonSelect === 'PickUp') {

      let claimInitDate = this.editPpnInfoData.ClaimIntimationDate ? new Date(this.editPpnInfoData.ClaimIntimationDate) : '';
      let preferDateTime = this.editPpnInfoData.PreferredTimePickUp ? new Date(this.editPpnInfoData.PreferredTimePickUp) : '';

      this.selectSlotForm.addControl('claimintimationdate', new FormControl({ value: claimInitDate, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation));
      this.selectSlotForm.addControl('prefertime', new FormControl({ value: preferDateTime, disabled: this.editPpnInfoData.IsEdit }, ValidationConstants.requiredValidation));
      this.selectSlotForm.addControl('pickupconfirm', new FormControl(this.editPpnInfoData.ConfirmedPickUp));
    }

    if (this.id) {
      this.ppncreateservice.slotsSubject.next({ ...this.selectSlotForm.value, isValid: this.selectSlotForm.status })
    }
  }
  // getter for form controls
  get getSlotFormValue( ) {
    return this.selectSlotForm.controls ;
  }
  get startslot() {
    return this.getSlotFormValue['startslot'] 
  }
  get endslot() {
    return this.getSlotFormValue['endslot']
  }
  get claimintimationdate() {
    return this.getSlotFormValue['claimintimationdate']
  }
  get prefertime() {
    return this.getSlotFormValue['prefertime']
  }
  get pickupconfirm() {
    return this.getSlotFormValue['pickupconfirm']
  }
  //-----end ----------
  slotOnChange(){
    this.selectSlotForm.valueChanges.subscribe(formValue => {
      //if (this.selectSlotForm.status === 'VALID') {
        this.ppncreateservice.slotsSubject.next({ ...formValue, isValid: this.selectSlotForm.status })
        //console.log('SLOT INFO FORM VALUE ONCHANGE ', this.selectSlotForm.status);
      //}
    });
    this.subscription = this.ppncreateservice.isSubmit.subscribe((val) => {
      console.log(val)
      this.isSubmit = val
    })
  }


  showSlotCal() {
    this.ppncreateservice.showSlotCalendar.next(true)
  }

  patchSelectedSlot() {
    this.selectSlotForm.patchValue({
      startslot: this.selectedSlotData['startslot'],
      endslot: this.selectedSlotData['endslot']
    });
  }

  getDropClaimDetails() {
    if (this.actonSelect === 'Drop') {
      this.ppncreateservice.dropJobClaimDetails.subscribe((fromValues: any) => {
        //console.log("AUTO CLAIM SUBSCRIBE =>", fromValues)
        this.selectSlotForm.patchValue({
          claimintimationdate: new Date(fromValues.ClaimIntimationDate),
          pickupconfirm: fromValues.ConfirmedPickUp,
        })
      })
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
